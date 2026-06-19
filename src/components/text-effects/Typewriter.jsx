import { useState, useEffect, useRef } from "react";

/**
 * Typewriter
 * Kasuje aktualny tekst znak po znaku, potem pisze nowy.
 * Szerokość kontenera jest stabilna – trzymana przez niewidoczny ghost tekstu.
 *
 * @param {string}  text               - tekst do wyświetlenia
 *
 * @param {"fixed"|"normalized"} [mode="fixed"]
 *   "fixed":      stała prędkość per litera – dłuższy tekst = dłuższa animacja
 *   "normalized": stały łączny czas – prędkość skaluje się do długości tekstu
 *
 * @param {number}  [eraseSpeed=35]
 *   "fixed":      ms na literę podczas kasowania
 *   "normalized": łączny czas kasowania (ms), np. 400 = zawsze ~0.4s
 *
 * @param {number}  [typeSpeed=55]
 *   "fixed":      ms na literę podczas pisania
 *   "normalized": łączny czas pisania (ms), np. 600 = zawsze ~0.6s
 *
 * @param {boolean} [cursor=true]      - czy pokazywać migający kursor
 */
export function Typewriter({
  text,
  mode = "fixed",
  eraseSpeed = 35,
  typeSpeed = 55,
  cursor = true,
}) {
  const [display, setDisplay] = useState(text);
  const [phase, setPhase] = useState("idle");
  const [ghostText, setGhostText] = useState(text);
  const timersRef = useRef([]);

  useEffect(() => {
    timersRef.current.forEach(clearInterval);
    timersRef.current = [];

    setPhase("erasing");

    const snapshot = display;

    const eraseMs = mode === "normalized"
      ? Math.max(1, Math.round(eraseSpeed / (snapshot.length || 1)))
      : eraseSpeed;

    const typeMs = mode === "normalized"
      ? Math.max(1, Math.round(typeSpeed / (text.length || 1)))
      : typeSpeed;

    let i = snapshot.length;

    const erase = setInterval(() => {
      i--;
      setDisplay(snapshot.slice(0, i));
      if (i <= 0) {
        clearInterval(erase);
        setGhostText(text);
        setPhase("typing");
        let j = 0;
        const type = setInterval(() => {
          j++;
          setDisplay(text.slice(0, j));
          if (j >= text.length) {
            clearInterval(type);
            setPhase("idle");
          }
        }, typeMs);
        timersRef.current.push(type);
      }
    }, eraseMs);

    timersRef.current.push(erase);
    return () => timersRef.current.forEach(clearInterval);
  }, [text]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>

      {/* Ghost – trzyma szerokość kontenera, niewidoczny */}
      <span style={{ visibility: "hidden", whiteSpace: "nowrap" }}>
        {ghostText}
      </span>

      {/* Animowany tekst – leży na ghostcie absolutnie */}
      <span style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap" }}>
        {display}
        {cursor && (
          <span style={{
            opacity: phase === "idle" ? 0 : 0.6,
            transition: "opacity 0.2s",
            marginLeft: "1px",
          }}>
            |
          </span>
        )}
      </span>

    </span>
  );
}
