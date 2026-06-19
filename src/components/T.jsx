import { useLanguage } from "../context/LanguageContext";
import styles from "./T.module.css";
import { BlurFade, SlideReplace, Wave, Typewriter, SlotMachine, Flip } from "./text-effects";

export function T({ tkey }) {
  const { t, lang } = useLanguage();

  return (
    <Wave 
      text={t(tkey)} 
      className={styles.text} />
  );
}