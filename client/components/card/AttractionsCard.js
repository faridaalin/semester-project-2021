import Image from 'next/image';
import styles from './attractionsCard.module.css';

const AttractionsCard = (props) => {
  const { attractions } = props;

  return (
    <div className={styles.attractionsCard}>
      <div className={styles.image}>
        <Image
          src={attractions.image_url}
          alt={attractions.name}
          width={464}
          height={464}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.H3}>{attractions.name}</h3>
        <section
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: attractions.description,
          }}
        />
      </div>
    </div>
  );
};

export default AttractionsCard;
