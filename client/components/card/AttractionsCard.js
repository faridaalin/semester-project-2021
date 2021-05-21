import Image from 'next/image';
import styles from './attractionsCard.module.css';

const AttractionsCard = (props) => {
  const { attractions } = props;

  return (
    <div className={styles.attractionsCard}>
      <div className={styles.imageContainer}>
        <Image
          src={attractions.image_url}
          alt={attractions.name}
          layout='fill'
          objectFit='cover'
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.H3}>{attractions.name}</h3>
        <section
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: attractions.description,
          }}
        ></section>
      </div>
    </div>
  );
};

export default AttractionsCard;
