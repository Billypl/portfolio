import styles from './Contact.module.css';
import Section from '../components/Section';

function Contact() {
    return (<>
        <Section id="contact" 
            className={styles.contact   } 
            color={"var(--black)"}
            headerDesc="Napisz do mnie"
            headerTitle="Kontakt"
            descriptionColor="var(--red)"
        >
            Kontakt
        </Section>
    </>
    )
}

export default Contact