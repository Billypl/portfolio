import styles from './Hero.module.css'
import myPicture from '../assets/myPicture.png'
import Button from '../components/Button';
import Logo from '../components/Logo';
import Section from '../components/Section';

function Hero() {
    return (<>
    <Section id="aboutme" className={styles.hero}>
        <div className={styles.textCol}>

            <p className={styles.eyebrow}>Student informatyki - politechnika gdańska</p>

            <div className={styles.content}>
                <Logo/>
                <p className={styles.desc1}>Studiuję Informatykę na drugim stopniu na Politechnice Gdańskiej. Kocham czytać książki, a na ogniska nie ruszam się bez gitary. Moją pasją jest programowanie, z naciskiem na backend oraz lekką domieszką devops.</p>
                <p className={styles.desc2}>Chętnie pomagam w pracach domowych i udzielam korepetycji z informatyki.</p>
            </div>

            <div className={styles.buttons}>
                <Button type="primary" href="#projects"  icon="fas fa-code">PROJEKTY</Button>
                <Button type="secondary" href="#contact"  icon="fas fa-envelope">KONTAKT</Button>
            </div>

        </div>

        <div className={styles.imageCol}>
            <img className={styles.image} src={myPicture} alt="Billy"/>
        </div>

    </Section>
    </>);
}

export default Hero