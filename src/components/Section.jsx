import styles from './Section.module.css';

function Section({ children, id, className, color }) {
    return (
        <div className={styles.sectionColor}  style={{ backgroundColor: color || 'var(--black)' }}>
            <section
                id={id}
                className={`${styles.section} ${className || ""}`}
                >
                {children}
            </section>
        </div>
    )
}


export default Section;