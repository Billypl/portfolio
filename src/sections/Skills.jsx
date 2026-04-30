import styles from './Skills.module.css';
import Section from '../components/Section';

function Skills() {
    return (<>
        <Section id="skills" 
            className={styles.skills} 
            color={"var(--black)"}
            headerDesc="Moje umiejętności"
            headerTitle="Umiejętności"
            descriptionColor="var(--red)"
        >
            Umiejętności
        </Section>
    </>
    )
}

export default Skills