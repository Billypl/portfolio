import { useLanguage } from "../context/LanguageContext";
import styles from "./LanguageToggle.module.css";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button className={styles.toggle} onClick={toggleLang}
    aria-label={lang === "pl" ? "Switch to English" : "Przełącz na polski"}>
        <span className={`${styles.lang} ${lang==="pl" ? styles.active : ""}`}>PL</span>
        <span className={styles.sep}>/</span>
        <span className={`${styles.lang} ${lang==="en" ? styles.active : ""}`}>EN</span>
    </button>
  );
}