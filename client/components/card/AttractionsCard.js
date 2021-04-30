import Image from 'next/image';
import styles from './attractionsCard.module.css';

const AttractionsCard = (props) => {
  const { attractions } = props;
  console.log('attraction :', attractions);
  return (
    <div className={styles.attractionsCard}>
      <div className={styles.image}>
        <Image
          src={attractions.image_url}
          alt={attractions.name}
          width={400}
          height={400}
        />
      </div>

      <h3 className={styles.H3}>{attractions.name}</h3>
      <section
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: attractions.description,
        }}
      />
    </div>
  );
};

export default AttractionsCard;
