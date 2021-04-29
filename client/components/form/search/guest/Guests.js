import { useState } from 'react';
import { InputNumber, InputGroup, Button } from 'rsuite';
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
          <InputGroup>
            <InputGroup.Button
              onClick={() =>
                adults <= 1 ? setAdults(1) : setAdults(adults - 1)
              }
            >
              -
            </InputGroup.Button>
            <InputNumber className={'custom-input-number'} value={adults} />
            <InputGroup.Button onClick={() => setAdults(adults + 1)}>
              +
            </InputGroup.Button>
          </InputGroup>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.guests}>
          <div>Children</div>
          <div className={styles.info}>Ages 12 or above</div>
        </div>
        <div className={styles.guestsInput}>
          <InputGroup>
            <InputGroup.Button
              onClick={() =>
                children <= 0 ? setChildren(0) : setChildren(children - 1)
              }
            >
              -
            </InputGroup.Button>
            <InputNumber className={'custom-input-number'} value={children} />
            <InputGroup.Button onClick={() => setChildren(children + 1)}>
              +
            </InputGroup.Button>
          </InputGroup>
        </div>
      </div>
    </section>
  );
};

export default Guests;
