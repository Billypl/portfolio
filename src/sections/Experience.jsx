import styles from './Experience.module.css';
import Section from '../components/Section';

function Experience() {
    return (<>
        <Section id="experience" 
            className={styles.experience} 
            color={"var(--black)"}
            headerDesc="Wykszałcenie i praca"
            headerTitle="Doświadczenie"
            descriptionColor="var(--red)"
        >
            Edukacja, praca, certyfikaty
        </Section>
    </>
    )
}

export default Experience