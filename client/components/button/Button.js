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
  isDisabled,
}) => {
  const getColor = () => {
    if (color === 'orange') {
      return `${styles.buttonOrange}`;
    }
    if (color === 'grey') {
      return `${styles.buttonGrey}`;
    }
    if (color === 'dark') {
      return `${styles.buttonDark}`;
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
      <button
        type='submit'
        disabled={isDisabled}
        onClick={clickHandler}
        className={`${
          styles.button
        } ${getColor()} ${getSize()} ${getWidth()} ${customBtnClass}`}
      >
        {children}
      </button>
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
