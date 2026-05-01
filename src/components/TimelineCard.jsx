import styles from './TimelineCard.module.css';

function TimelineCard({ year, title, desc, index }) {
  return (
    <div className={styles.card}>
      <div className={styles.watermark}>{String(index + 1).padStart(2, '0')}</div>
      <div className={styles.year}>{year}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default TimelineCard;