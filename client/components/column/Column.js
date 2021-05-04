import React from 'react';
import styles from './column.module.css';

const Column = ({ children }) => {
  return <div className={styles.column}>{children}</div>;
};

export default Column;
