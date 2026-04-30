import styles from './Timeline.module.css';
import Section from '../components/Section';

function Timeline() {
    return (
        <Section id="timeline" className={styles.timeline} color={"var(--dark-red)"}>
            <h1>Timeline</h1>
            <p>This is the timeline section.</p>
        </Section>
    )
}

export default Timeline