import React from 'react';
import styles from './alert.module.css';

const Alert = ({ status }) => {
  return (
    <div className={`${status?.sent ? styles.success : styles.error}`}>
      <h3 className={styles.h3}>{status?.sent ? 'Success!' : 'Error!'}</h3>
      <p className={styles.paragraph}>{status?.msg}</p>
    </div>
  );
};

export default Alert;
