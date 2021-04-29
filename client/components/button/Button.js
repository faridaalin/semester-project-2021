import Link from 'next/link';
import styles from './button.module.css';

const Button = ({ children, size, color, btnType }) => {
  console.log('search', btnType);
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

  getColor(color);
  return (
    <Link href='/dashboard'>
      <a>
        <button className={`${styles.button} ${getColor()}`}>{children}</button>
      </a>
    </Link>
  );
};

export default Button;
