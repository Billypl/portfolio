import styles from './Timeline.module.css';
import Section from '../components/Section';

function Timeline() {
    return (<>
        <Section id="timeline" 
            className={styles.timeline} 
            color={"var(--dark-red)"}
            headerDesc="Moja droga"
            headerTitle="Historia"
            descriptionColor="var(--black)"
        >
            Dupa
        </Section>
    </>
    )
}

export default Timeline