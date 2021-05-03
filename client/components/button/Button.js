import Link from 'next/link';
import styles from './button.module.css';

const Button = ({ children, size, color, btnType, link, width }) => {
  const getColor = () => {
    if (color === 'orange') {
      return `${styles.buttonOrange}`;
    }
    if (color === 'grey') {
      return `${styles.buttonGrey}`;
    }
    if (btnType === 'search') {
      return `${styles.buttonOrange} ${styles.buttonSearch}`;
    }
  };
  const getSize = () => {
    if (size === 'm') {
      return `${styles.medium}`;
    }
    if (size === 's') {
      return `${styles.small}`;
    }
  };
  const getWidth = () => {
    if (width === 'full') {
      return `${styles.full}`;
    }
  };

  getColor(color);
  return (
    <Link href={!link ? '/' : link}>
      <a>
        <button
          className={`${
            styles.button
          } ${getColor()} ${getSize()} ${getWidth()}`}
        >
          {children}
        </button>
      </a>
    </Link>
  );
};

export default Button;
