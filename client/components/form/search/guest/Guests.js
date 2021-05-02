import { useState } from 'react';
import { X } from 'react-feather';
import styles from './guests.module.css';

const Guests = ({ setShowGuests, setGuests }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const closeModal = () => {
    setShowGuests(false);
  };

  const plusAdults = () => {
    setAdults(adults + 1);
    setGuests(adults + children);
  };
  const minusdults = () => {
    if (adults <= 1) {
      setAdults(1);
      setGuests(adults + children);
    } else {
      setAdults(adults - 1);
      setGuests(adults + children);
    }
  };
  const minusChildren = () => {
    if (children <= 1) {
      setChildren(0);
      setGuests(adults + children);
    } else {
      setGuests(adults + children);
      setChildren(children - 1);
    }
  };
  const plusChildren = () => {
    setChildren(children + 1);
    setGuests(adults + children);
  };
  console.log('Adults', adults);
  console.log('children', children);

  return (
    <section className={styles.container}>
      <button className={styles.closeModel}>
        <X className={styles.icon} onClick={closeModal} />
      </button>
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
