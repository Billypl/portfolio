import { useState, useEffect } from "react";
import styles from "./BlurFade.module.css";

/**
 * BlurFade
 * Cały tekst pojawia się przez rozmycie + poszerzenie letter-spacing.
 * Najpłynniejszy i najsubtelniejszy efekt – dobry do nagłówków.
 *
 * @param {string}  text              - tekst do wyświetlenia
 * @param {number}  [duration=500]    - czas trwania animacji (ms)
 * @param {string}  [letterSpacing]   - docelowy letter-spacing (np. "0.1em"), domyślnie dziedziczy
 */
export function BlurFade({ text, duration = 500, letterSpacing }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((k) => k + 1);
  }, [text]);

  return (
    <span
      key={key}
      className={styles.text}
      style={{
        animationDuration: `${duration}ms`,
        ...(letterSpacing ? { "--target-spacing": letterSpacing } : {}),
      }}
    >
      {text}
    </span>
  );
}
