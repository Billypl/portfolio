import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * SlotMachine
 * Każda litera losuje kilka razy, potem zatrzymuje się na docelowej.
 * Litery po lewej zatrzymują się wcześniej niż te po prawej.
 *
 * @param {string}  text          - tekst do wyświetlenia
 * @param {number}  [steps=8]     - ile razy każda litera się "przemieszuje"
 * @param {number}  [interval=40] - ms między każdym przemieszaniem (ms)
 * @param {number}  [stagger=15]  - dodatkowe opóźnienie per litera (ms)
 */
export function SlotMachine({ text, steps = 8, interval = 40, stagger = 15 }) {
  const [chars, setChars] = useState(() => text.split(""));
  const timersRef = useRef([]);

  useEffect(() => {
    timersRef.current.forEach(clearInterval);
    timersRef.current = [];

    const result = text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]);
    setChars([...result]);

    text.split("").forEach((targetChar, i) => {
      if (targetChar === " ") {
        setChars((prev) => {
          const next = [...prev];
          next[i] = " ";
          return next;
        });
        return;
      }

      let count = 0;
      const maxSteps = steps + i;
      const id = setInterval(() => {
        count++;
        if (count >= maxSteps) {
          clearInterval(id);
          setChars((prev) => {
            const next = [...prev];
            next[i] = targetChar;
            return next;
          });
        } else {
          setChars((prev) => {
            const next = [...prev];
            next[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
            return next;
          });
        }
      }, interval + i * stagger);

      timersRef.current.push(id);
    });

    return () => timersRef.current.forEach(clearInterval);
  }, [text]);

  return (
    <span>
      {chars.map((char, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}
