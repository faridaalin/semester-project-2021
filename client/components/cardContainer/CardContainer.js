import styles from './cardContainer.module.css';

const CardContainer = ({ children, type }) => {
  return (
    <div
      className={`${styles.cardGrid} ${
        type === 'category' ? styles.category : ''
      }`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
