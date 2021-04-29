import styles from './card.module.css';

const Card = ({ hotel }) => {
  // console.log('HOTEL:', hotel);
  return (
    <a href='https://nextjs.org/docs' className={styles.card}>
      <span>{hotel.rating}</span>
      <h3 className={styles.h4}>{hotel.title}</h3>
      <h4 className={styles.h4}>{hotel.address}</h4>
      <p>{hotel.description}</p>
    </a>
  );
};

export default Card;
