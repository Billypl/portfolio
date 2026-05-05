import styles from './Hobby.module.css';
import Section from '../components/Section';

function Hobby() {
    return (<>
        <Section id="hobby" 
            className={styles.hobby} 
            color={"var(--black)"}
            headerDesc="Moje hobby"
            headerTitle="Hobby"
            descriptionColor="var(--red)"
        >
            Hobby
        </Section>
    </>
    )
}

export default Hobby