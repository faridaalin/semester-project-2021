import React from 'react';
import styles from './alert.module.css';

const Alert = ({ status, info }) => {
  return (
    <div
      className={`${
        info ? styles.info : status?.sent ? styles.success : styles.error
      }`}
    >
      {info ? (
        ''
      ) : (
        <h3 className={styles.h3}>
          {status?.sent ? 'Success!' : 'An error happend.'}
        </h3>
      )}

      <p className={styles.paragraph}>{status?.msg}</p>
    </div>
  );
};

export default Alert;
