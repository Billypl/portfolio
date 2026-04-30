import styles from './Header.module.css';

function Header({ text, description, descriptionColor, className }) {
    return (
        <header className={styles.header}>
            <p className={styles.eyebrow} style={{ color: descriptionColor }}>
                {description}
            </p>
            <h2 className={`${styles.name} ${className || ""}`}>{text}</h2>
        </header>
    );
}

export default Header;