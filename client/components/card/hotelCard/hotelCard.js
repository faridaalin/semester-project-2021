import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Edit, Trash2 } from 'react-feather';
import { useCookies } from 'react-cookie';
import truncate from '@/helpers/truncate';
import showRating from '@/helpers/showRating';
import Button from '../../button/Button';
import { ITEM_TO_UPDATE, IS_ADMIN, COOKIE_VALUE } from '../../../contants';
import styles from './hotelCard.module.css';

const HotelCard = ({ hotel, setItemTodelete, setModal }) => {
  const [cookie] = useCookies([IS_ADMIN]);
  const admin = cookie.isAdmin === COOKIE_VALUE ? true : false;
  const [itemToUpdate, setItemToUpdate] = useState(false);

  const handleDeleteButton = (e) => {
    e.preventDefault();
    setModal(true);
    setItemTodelete(hotel);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setItemToUpdate(true);
  };
  const addToDeleteLocal = () => {
    localStorage.setItem(ITEM_TO_UPDATE, JSON.stringify(hotel));
  };

  useEffect(
    function () {
      if (itemToUpdate) {
        addToDeleteLocal();
        Router.push('/update-product');
      }
    },
    [itemToUpdate, setItemToUpdate, addToDeleteLocal]
  );

  return (
    <div className={styles.cardcontainer}>
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
              <div className={styles.description}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: truncate(hotel.description, 110),
                  }}
                />
              </div>
              <div className={styles.buttonContainer}>
                <Button color='orange' size='s'>
                  View More
                </Button>
                {admin === true && (
                  <div className={styles.icons}>
                    <button
                      className={styles.btnIcon}
                      onClick={handleDeleteButton}
                    >
                      <Trash2 className={styles.iconDelete} />
                    </button>
                    <button className={styles.btnIcon} onClick={handleUpdate}>
                      <Edit className={styles.iconUpdate} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default HotelCard;
