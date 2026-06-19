import { useState, useEffect } from "react";
import styles from "./SlideReplace.module.css";

/**
 * SlideReplace
 * Stary tekst wyjeżdża w górę, nowy wjeżdża z dołu.
 * Dobre do krótkich etykiet w nawigacji.
 *
 * @param {string}  text           - tekst do wyświetlenia
 * @param {number}  [duration=280] - czas trwania każdej fazy (ms)
 */
export function SlideReplace({ text, duration = 280 }) {
  const [displayed, setDisplayed] = useState(text);
  const [incoming, setIncoming] = useState(null);

  useEffect(() => {
    setIncoming(text);
    const timer = setTimeout(() => {
      setDisplayed(text);
      setIncoming(null);
    }, duration);
    return () => clearTimeout(timer);
  }, [text, duration]);

  return (
    <span
      className={styles.wrapper}
      style={{ "--duration": `${duration}ms` }}
    >
      <span className={incoming ? styles.outgoing : styles.stable}>
        {displayed}
      </span>
      {incoming && (
        <span className={styles.incoming}>
          {incoming}
        </span>
      )}
    </span>
  );
}
