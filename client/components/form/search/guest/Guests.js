import { useState, useEffect } from 'react';
import { X } from 'react-feather';
import styles from './guests.module.css';

const Guests = ({ setShowGuests, setGuests, wrapper }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const closeModal = () => {
    setShowGuests(false);
  };

  const plusAdults = (e) => {
    e.preventDefault();
    setAdults(() => adults + 1);
  };
  const minusdults = (e) => {
    e.preventDefault();
    if (adults <= 1) {
      setAdults(1);
    } else {
      setAdults(adults - 1);
    }
  };
  const plusChildren = (e) => {
    e.preventDefault();
    setChildren(() => children + 1);
  };
  const minusChildren = (e) => {
    e.preventDefault();
    if (children <= 1) {
      setChildren(0);
    } else {
      setChildren(children - 1);
    }
  };

  useEffect(() => {
    setGuests(adults + children);
  }, [children, adults]);

  return (
    <section className={styles.container} ref={wrapper}>
      <div className={styles.removeIcons}>
        <button className={styles.closeModel}>
          <X className={styles.icon} onClick={closeModal} />
        </button>
      </div>

      <div className={styles.flex}>
        <div className={styles.guests}>
          <div>Adults</div>
          <div className={styles.info}>Ages 18 or above</div>
        </div>
        <div className={styles.guestsInput}>
          <div className={styles.guestsInput}>
            <div className={styles.buttonsContainer}>
              <button onClick={minusdults}>-</button>
              <span>{adults}</span>
              <button onClick={plusAdults}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.guests}>
          <div>Children</div>
          <div className={styles.info}>Ages 12 or above</div>
        </div>
        <div className={styles.guestsInput}>
          <div className={styles.guestsInput}>
            <div className={styles.buttonsContainer}>
              <button onClick={minusChildren}>-</button>
              <span>{children}</span>
              <button onClick={plusChildren}>+</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guests;
