import React from 'react';
import styles from './sectionHeading.module.css';

const SectionHeading = ({ children }) => {
  return <h2 className={styles.h2}>{children}</h2>;
};

export default SectionHeading;
