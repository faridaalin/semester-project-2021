import Link from 'next/link';
import styles from './button.module.css';

const Button = ({ children, size, color }) => {
  const getColor = () => {
    if (color === 'orange') {
      return `${styles.buttonOrange}`;
    }
    if (color === 'grey') {
      return `${styles.buttonGrey}`;
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
