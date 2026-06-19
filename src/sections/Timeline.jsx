import styles from './Timeline.module.css';
import Section from '../components/Section';
import TimelineCard from '../components/TimelineCard';

const events = [
  { year: 2019, title: "Pierwsze kroki", desc: "Pierwsze programy — Wisielec i gra karciana Makao. Odkrycie pasji do programowania i logiki algorytmów.", side: "left" },
  { year: 2021, title: "ASCII Generator", desc: "Narzędzie konwertujące zdjęcia na ASCII art. Pierwsze doświadczenie z przetwarzaniem obrazów i bibliotekami zewnętrznymi.", side: "right" },
  { year: 2022, title: "Politechnika Gdańska", desc: "Rekrutacja i rozpoczęcie studiów inżynierskich na kierunku Informatyka. Nowe wyzwania, nowe technologie.", side: "left" },
  { year: 2023, title: "Projekty zespołowe", desc: "Online Shop (Prestashop + Docker + CI/CD) i Pixel Havoc (multiplayer TCP/UDP). Nauka pracy w zespole i DevOps.", side: "right" },
  { year: 2024, title: "UniGuesserRun", desc: "Grupowy projekt inżynierski — aplikacja pomagająca nowym studentom poznać kampus PG. Dwa tryby rozgrywki.", side: "left" },
  { year: 2025, title: "Co dalej?", desc: "3 rok studiów. Szukam nowych wyzwań, projektów open-source i możliwości zawodowej współpracy.", side: "right" },
];

function Timeline() {
    return (<>
        <Section id="timeline" 
            className={styles.timeline} 
            color={"var(--light-black)"}
            headerDesc="Moja droga"
            headerTitle="Historia"
            descriptionColor="var(--red)"
        >
                        
            <div className={styles.spine} />
            <div className={styles.items}>
                {events.map((event, i) => (
                <div key={i} className={styles.row}>
                    {event.side === 'left' ? (
                    <>
                        <TimelineCard {...event} index={i} />
                        <div className={styles.hub}>
                            <div className={styles.dot} />
                        </div>
                        <div className={styles.blank} />
                    </>
                    ) : (
                    <>
                        <div className={styles.blank} />
                        <div className={styles.hub}>
                            <div className={styles.dot} />
                        </div>
                        <TimelineCard {...event} index={i} />
                    </>
                    )}
                </div>
                ))}
            </div>


        </Section>
    </>
    )
}

export default Timeline