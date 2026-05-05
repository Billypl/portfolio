import GlowBorder from './GlowingBorder';
import styles from './TimelineCard.module.css';

function TimelineCard({ year, title, desc, index }) {
  return (
    <GlowBorder radius={8} thickness={2} speed={4} streak={0.25} c1="red" c2="rgba(61, 53, 53, 0.16)" hoverOnly>
      <div className={styles.card}>
        <div className={styles.watermark}>{String(index + 1).padStart(2, '0')}</div>
        <div className={styles.year}>{year}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </GlowBorder>
  );
}

export default TimelineCard;
