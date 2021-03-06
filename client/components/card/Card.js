import Link from 'next/link';
import { Star } from 'react-feather';
import truncate from '@/helpers/truncate';
import showRating from '@/helpers/showRating';
import styles from './card.module.css';

const Card = (props) => {
  const { hotel } = props;
  const { hotelStyle } = props;

  if (hotel) {
    return (
      <div className={styles.cardcontainer}>
        <Link href={`/hotel/${hotel._id}`}>
          <a
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
              <h3 className={`${styles.h3} ${styles.headerFavs}`}>
                {hotel.title}
              </h3>
              <h4 className={styles.h4}>{hotel.address}</h4>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: truncate(hotel.description, 120),
                }}
              ></div>
            </div>
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.cardWrapper}>
      <Link href={`/category/${hotelStyle.slug}`}>
        <a
          className={styles.cardType}
          style={{
            backgroundImage: `url(${hotelStyle.imageurl})`,
          }}
          data-style={hotelStyle.slug}
        >
          <div className={styles.content}>
            <h3 className={styles.h3}>{hotelStyle.type}</h3>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Card;
