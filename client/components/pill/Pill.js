import { ChevronDown } from 'react-feather';
import styles from './pill.module.css';

const Pill = ({ name, select }) => {
  if (select < 2) {
    return <button className={`${styles.primaryButton}`}>{name}</button>;
  }
  return (
    <div className={styles.container}>
      <button className={`${styles.primaryButton}`}>
        {name} <ChevronDown className={styles.icon} />
      </button>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>{name}: Hight to low</button>
        <button className={styles.button}>{name}: Low to heigh</button>
      </div>
    </div>
  );
};

export default Pill;
