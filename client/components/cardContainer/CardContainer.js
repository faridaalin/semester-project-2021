import styles from './cardContainer.module.css';

const CardContainer = ({ children }) => {
  return <div className={styles.cardGrid}>{children}</div>;
};

export default CardContainer;
