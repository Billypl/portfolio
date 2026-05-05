import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import styles from "./T.module.css";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
const DURATION = 600;   // ms całej animacji
const STEPS = 12;       // ile razy litery się "przemieszają"

function scramble(target, progress) {
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      const revealed = i < Math.floor(progress * target.length);
      if (revealed) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

export function T({ tkey }) {
  const { t, lang } = useLanguage();
  const target = t(tkey);

  const [display, setDisplay] = useState(target);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      setDisplay(scramble(target, progress));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [lang, target]);

  return <span className={styles.text}>{display}</span>;
}