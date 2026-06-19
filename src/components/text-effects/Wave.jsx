import { useState, useEffect } from "react";
import styles from "./Wave.module.css";

/**
 * Wave
 * Litery pojawiają się sekwencyjnie z dołu – jak fala od lewej do prawej.
 *
 * @param {string}  text           - tekst do wyświetlenia
 * @param {number}  [stagger=45]   - opóźnienie między kolejnymi literami (ms)
 * @param {number}  [duration=350] - czas trwania animacji jednej litery (ms)
 */
export function Wave({ text, stagger = 45, duration = 350 }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((k) => k + 1);
  }, [text]);

  return (
    <span>
      {text.split("").map((char, i) => (
        <span
          key={`${key}-${i}`}
          className={styles.char}
          style={{
            animationDelay: `${i * stagger}ms`,
            animationDuration: `${duration}ms`,
          }}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}
