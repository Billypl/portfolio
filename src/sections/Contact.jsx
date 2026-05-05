import styles from './Contact.module.css';
import Section from '../components/Section';
import GlowBorder from "../components/GlowingBorder";

function Contact() {
    return (<>
        <Section id="contact" 
            className={styles.contact   } 
            color={"var(--black)"}
            headerDesc="Napisz do mnie"
            headerTitle="Kontakt"
            descriptionColor="var(--red)"
        >

            <GlowBorder radius={14} thickness={2} speed={4} streak={0.25} c1="red" c2="rgba(61, 53, 53, 0.16)">
                <div style={{ background: "#1a1a1f", padding: "24px 32px", color: "white" }}>
                    twoja treść
                </div>
            </GlowBorder>

            Kontakt
        </Section>
    </>
    )
}

export default Contact