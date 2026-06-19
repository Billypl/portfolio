import styles from './Projects.module.css';
import Section from '../components/Section';

function Projects() {
    return (<>
        <Section id="projects" 
            className={styles.projects} 
            color={"var(--black)"}
            headerDesc="Moja prace"
            headerTitle="Projekty"
            descriptionColor="var(--red)"
        >
            Projekty
        </Section>
    </>
    )
}

export default Projects