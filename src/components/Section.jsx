import styles from './Section.module.css';
import Header from './Header';

function Section({ children, id, className, color, headerTitle, headerDesc, descriptionColor }) {
    return (<>
        <div className={styles.sectionColor}  style={{ backgroundColor: color || 'var(--black)' }}>
            {headerTitle && (
                <div className={styles.headerContainer}>
                    <Header text={headerTitle} description={headerDesc} descriptionColor={descriptionColor} />
                </div>
            )}
            <div className={styles.inner}>
                <section
                    id={id}
                    className={`${styles.section} ${className || ""}`}
                    >
                    {children}
                </section>
            </div>
        </div>
    </>)
}


export default Section;