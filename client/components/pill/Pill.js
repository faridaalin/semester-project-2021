import { useState } from 'react';
import { ChevronDown } from 'react-feather';
import styles from './pill.module.css';

const Pill = ({ name, select }) => {
  const [show, setShow] = useState(false);
  if (select < 2) {
    return <button className={`${styles.primaryButton}`}>{name}</button>;
  }
  return (
    <div className={styles.container}>
      <button
        className={`${styles.primaryButton}`}
        onClick={() => setShow(!show)}
      >
        {name} <ChevronDown className={styles.icon} />
      </button>
      {show && (
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => console.log('Sort hotels heigh to low')}
          >
            {name}: Hight to low
          </button>
          <button
            className={styles.button}
            onClick={() => console.log('Sort hotels low to heigh')}
          >
            {name}: Low to heigh
          </button>
        </div>
      )}
    </div>
  );
};

export default Pill;
