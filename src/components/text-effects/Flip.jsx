import { useState, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./Flip.module.css";

// ─── Stałe ────────────────────────────────────────────────────────────────────

const NON_BREAKING_SPACE = "\u00a0";
const WIDTH_CLEANUP_DELAY_MS = 60;

// ─── Pomocnicze ───────────────────────────────────────────────────────────────

/**
 * Zamienia spację na niełamliwy odpowiednik, żeby inline-block nie zwinął
 * pustego slotu do zera.
 */
function normalizeSpace(char) {
  return char === " " ? NON_BREAKING_SPACE : char;
}

/**
 * Oblicza opóźnienie animacji dla jednego indeksu slotu.
 * W trybie „normalized" całkowity czas stagger jest stały niezależnie od
 * długości tekstu; w trybie „fixed" każdy slot dostaje dokładnie `stagger` ms.
 */
function calculateSlotDelay(slotIndex, stagger, totalSlots, mode) {
  if (mode === "normalized" && totalSlots > 1) {
    return slotIndex * Math.round(stagger / (totalSlots - 1));
  }
  return slotIndex * stagger;
}

/**
 * Tworzy tablicę slotów reprezentujących statyczny (nieanimowany) tekst.
 */
function buildStaticSlots(text) {
  return [...text].map((char) => ({
    char,
    previousChar: null,
    runId: 0,
    collapsed: false,
  }));
}

/**
 * Tworzy tablicę slotów przejściowych dla animacji starego → nowego tekstu.
 * Dla każdej pozycji pamiętamy poprzedni znak (`previousChar`) i nowy (`char`).
 */
function buildTransitionSlots(oldText, newText, runId) {
  const length = Math.max(oldText.length, newText.length);
  return Array.from({ length }, (_, index) => ({
    char: newText[index] ?? null,
    previousChar: oldText[index] ?? null,
    runId,
    collapsed: false,
  }));
}

/**
 * Mierzy szerokość docelową przez tymczasowy klon DOM niewidoczny dla
 * użytkownika. Klon naśladuje strukturę rzeczywistego rendera (span per znak),
 * żeby `offsetWidth` był miarodajny.
 */
function measureTargetWidth(referenceElement, targetText) {
  const computedStyle = getComputedStyle(referenceElement);

  const clone = document.createElement("span");
  clone.setAttribute("aria-hidden", "true");
  clone.style.cssText = `
    display: inline-block; position: absolute; visibility: hidden;
    pointer-events: none; white-space: nowrap;
    font: ${computedStyle.font};
    letter-spacing: ${computedStyle.letterSpacing};
    text-transform: ${computedStyle.textTransform};
  `;

  for (const char of targetText || " ") {
    const charSpan = document.createElement("span");
    charSpan.style.display = "inline-block";
    charSpan.textContent = normalizeSpace(char);
    clone.appendChild(charSpan);
  }

  document.body.appendChild(clone);
  const width = clone.offsetWidth;
  clone.remove();

  return width;
}

// ─── Pod-komponenty ───────────────────────────────────────────────────────────

/**
 * Statyczny znak bez animacji – używany gdy slot jest już po przejściu
 * lub przy pierwszym renderze.
 */
function StaticChar({ char }) {
  return (
    <span className={styles.char}>
      {normalizeSpace(char)}
    </span>
  );
}

/**
 * Znak wychodzący (stary) – gra animację flipOut, a po jej zakończeniu
 * zgłasza, że slot powinien zostać zwinięty do szerokości 0.
 */
function OutgoingChar({ char, delayMs, durationMs, onFlipOutEnd }) {
  function handleAnimationEnd(event) {
    if (event.animationName === "flipOut") {
      onFlipOutEnd();
    }
  }

  return (
    <span
      className={styles.charOut}
      style={{ animationDelay: `${delayMs}ms`, animationDuration: `${durationMs}ms` }}
      onAnimationEnd={handleAnimationEnd}
    >
      {normalizeSpace(char)}
    </span>
  );
}

/**
 * Znak wchodzący (nowy) – gra animację flipIn, a po jej zakończeniu
 * zgłasza, że slot powinien wrócić do formy statycznej.
 */
function IncomingChar({ char, delayMs, durationMs, onFlipInEnd }) {
  function handleAnimationEnd(event) {
    if (event.animationName === "flipIn") {
      onFlipInEnd();
    }
  }

  return (
    <span
      className={styles.charIn}
      style={{ animationDelay: `${delayMs}ms`, animationDuration: `${durationMs}ms` }}
      onAnimationEnd={handleAnimationEnd}
    >
      {normalizeSpace(char)}
    </span>
  );
}

/**
 * Slot animowany – zawiera znak wychodzący i (opcjonalnie) wchodzący.
 * Gdy `collapsed` jest true, slot ma szerokość 0 i chowa się całkowicie.
 */
function AnimatedSlot({ slot, slotIndex, halfDurationMs, stagger, totalSlots, mode, onCollapse, onSettle }) {
  const delayMs = calculateSlotDelay(slotIndex, stagger, totalSlots, mode);

  function handleFlipOutEnd() {
    if (slot.char !== null) return; // poczekaj aż charIn obsłuży cleanup
    onCollapse(slotIndex, slot.runId);
  }

  function handleFlipInEnd() {
    onSettle(slotIndex, slot.runId);
  }

  return (

    <span className={styles.slotContainer}>
      <span>&nbsp;</span>
    <span className={slot.collapsed ? styles.slotGone : styles.slot}>
      <OutgoingChar
        char={slot.previousChar}
        delayMs={delayMs}
        durationMs={halfDurationMs}
        onFlipOutEnd={handleFlipOutEnd}
        />
      {slot.char !== null && (
        <IncomingChar
        char={slot.char}
        delayMs={delayMs + halfDurationMs}
        durationMs={halfDurationMs}
        onFlipInEnd={handleFlipInEnd}
        />
      )}
    </span>
      </span>
  );
}

// ─── Główny komponent ─────────────────────────────────────────────────────────

export function Flip({ text, stagger = 50, duration = 350, mode = "fixed" }) {
  const halfDurationMs = Math.round(duration / 2);

  const [slots, setSlots] = useState(() => buildStaticSlots(text));

  const previousTextRef    = useRef(text);
  const runIdCounterRef    = useRef(0);
  const wrapperRef         = useRef(null);
  const savedOldWidthRef   = useRef(null);
  const targetWidthRef     = useRef(null);
  const widthCleanupTimer  = useRef(null);

  // ── Animacja szerokości kontenera ──────────────────────────────────────────
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || savedOldWidthRef.current === null) return;

    const oldWidth    = savedOldWidthRef.current;
    const targetWidth = targetWidthRef.current;
    savedOldWidthRef.current = null;
    targetWidthRef.current   = null;

    if (!targetWidth || targetWidth === oldWidth) return;

    wrapper.style.transition = "none";
    wrapper.style.width = `${oldWidth}px`;
    wrapper.getBoundingClientRect(); // wymuszenie flushu layoutu
    wrapper.style.transition = `width ${duration}ms ease`;
    wrapper.style.width = `${targetWidth}px`;

    clearTimeout(widthCleanupTimer.current);
    widthCleanupTimer.current = setTimeout(() => {
      if (wrapperRef.current) wrapperRef.current.style.width = "";
    }, duration + WIDTH_CLEANUP_DELAY_MS);
  }, [slots, duration]);

  // ── Aktualizacja slotów po zmianie tekstu ──────────────────────────────────
  useEffect(() => {
    const oldText = previousTextRef.current;
    previousTextRef.current = text;
    if (oldText === text) return;

    const newRunId = ++runIdCounterRef.current;

    if (wrapperRef.current) {
      savedOldWidthRef.current = wrapperRef.current.offsetWidth;
      targetWidthRef.current   = measureTargetWidth(wrapperRef.current, text);
    }

    setSlots(buildTransitionSlots(oldText, text, newRunId));
  }, [text, stagger, duration, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Callbacki do aktualizacji stanu slotów ─────────────────────────────────

  /** Wywołany gdy OutgoingChar skończy flipOut i nie ma następnika → zwiń slot. */
  function collapseSlot(slotIndex, runId) {
    setSlots((currentSlots) =>
      currentSlots.map((slot, index) =>
        index === slotIndex && slot.runId === runId
          ? { ...slot, collapsed: true }
          : slot
      )
    );
  }

  /** Wywołany gdy IncomingChar skończy flipIn → uprość slot do statycznego. */
  function settleSlot(slotIndex, runId) {
    setSlots((currentSlots) =>
      currentSlots.map((slot, index) =>
        index === slotIndex && slot.runId === runId
          ? { ...slot, previousChar: null, runId: 0 }
          : slot
      )
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <span
      ref={wrapperRef}
      className={styles.wrapper}
    >
      {slots.map((slot, index) =>
        slot.previousChar === null ? (
          <StaticChar key={index} char={slot.char} />
        ) : (
          <AnimatedSlot
            key={index}
            slot={slot}
            slotIndex={index}
            halfDurationMs={halfDurationMs}
            stagger={stagger}
            totalSlots={slots.length}
            mode={mode}
            onCollapse={collapseSlot}
            onSettle={settleSlot}
          />
        )
      )}
    </span>
  );
}
