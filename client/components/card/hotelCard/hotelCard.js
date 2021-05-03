import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'react-feather';
import truncate from '../../../helpers/truncate';
import showRating from '../../../helpers/showRating';
import Button from '../../button/Button';

import styles from './hotelCard.module.css';

const HotelCard = ({ hotel }) => {
  return (
    <Link href={`/hotel/${hotel._id}`}>
      <a>
        <div className={styles.hotelCard}>
          <div className={styles.imageContainer}>
            <Image
              src={hotel.main_image}
              alt={hotel.title}
              layout='fill'
              objectFit='cover'
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h3 className={`${styles.h3} ${styles.header}`}>{hotel.title}</h3>
            <h4 className={styles.h4}>{hotel.address}</h4>
            <span>
              {showRating(hotel.rating).map((i) => (
                <Star key={i} className={styles.rating} />
              ))}
            </span>
            <section
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: truncate(hotel.description, 110),
              }}
            ></section>
            <Button color='orange' size='s'>
              View More
            </Button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default HotelCard;
