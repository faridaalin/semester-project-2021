import Link from 'next/link';
import styles from './button.module.css';

const Button = ({
  children,
  size,
  color,
  btnType,
  link,
  width,
  clickHandler,
  customBtnClass,
  submit,
}) => {
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

  if (submit) {
    return (
      <input
        type='submit'
        value='Login'
        onClick={clickHandler}
        className={`${
          styles.button
        } ${getColor()} ${getSize()} ${getWidth()} ${customBtnClass}`}
      />
    );
  }
  if (!link) {
    return (
      <button
        type='button'
        onClick={clickHandler}
        className={`${
          styles.button
        } ${getColor()} ${getSize()} ${getWidth()} ${customBtnClass}`}
      >
        {children}
      </button>
    );
  }
  return (
    <Link href={link}>
      <a>
        <button
          onClick={clickHandler}
          className={`${
            styles.button
          } ${getColor()} ${getSize()} ${getWidth()} ${customBtnClass}`}
        >
          {children}
        </button>
      </a>
    </Link>
  );
};

export default Button;
