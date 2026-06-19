import styles from './Footer.module.css';
import Section from '../components/Section';

function Footer() {
    return (<>
        <Section id="footer" 
            className={styles.footer} 
            color={"var(--black)"}
            headerDesc="Stworzona przez @Billy w 2026 roku"
            headerTitle="Stopka"
            descriptionColor="var(--red)"
        >
            Projekty
        </Section>
    </>
    )
}

export default Footer