import { Star } from 'react-feather';
import truncate from '../utils/truncate';
import showRating from '../utils/showRating';
import styles from './card.module.css';

const Card = (props) => {
  const { hotel } = props;
  const { hotelStyle } = props;
  console.log('PROPS', props);

  if (hotel) {
    return (
      <a
        href='https://nextjs.org/docs'
        className={styles.card}
        style={{
          backgroundImage: `url(${hotel.main_image})`,
        }}
      >
        <div className={styles.content}>
          <span>
            {showRating(hotel.rating).map((i) => (
              <Star key={i} className={styles.rating} />
            ))}
          </span>
          <h3 className={styles.h3}>{hotel.title}</h3>
          <h4 className={styles.h4}>{hotel.address}</h4>
          <section
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: truncate(hotel.description, 120),
            }}
          />
        </div>
      </a>
    );
  }
  return (
    <a
      href='https://nextjs.org/docs'
      className={`${styles.card} ${styles.cardType}`}
      style={{
        backgroundImage: `url(${hotelStyle.imageurl})`,
      }}
    >
      <div className={styles.content}>
        <h3 className={styles.h3}>{hotelStyle.type}</h3>
      </div>
    </a>
  );
};

export default Card;
