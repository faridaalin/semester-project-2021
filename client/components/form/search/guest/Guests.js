import { useState } from 'react';
import { X } from 'react-feather';
import styles from './guests.module.css';

const Guests = ({ setShowGuests }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const closeModal = () => {
    setShowGuests(false);
  };

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
          <div>
            <button
              onClick={() =>
                adults <= 1 ? setAdults(1) : setAdults(adults - 1)
              }
            >
              -
            </button>
            <span>{adults}</span>
            <button onClick={() => setAdults(adults + 1)}>+</button>
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
            <div>
              <button
                onClick={() =>
                  children <= 0 ? setChildren(0) : setChildren(children - 1)
                }
              >
                -
              </button>
              <span>{children}</span>
              <button onClick={() => setChildren(children + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guests;
