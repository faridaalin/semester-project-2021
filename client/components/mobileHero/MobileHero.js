import React from 'react';
import Search from '../form/search/Search';
import styles from './mobileHero.module.css';

const MobileHero = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <span className={styles.explore}>Explore</span>
        <h1 className={styles.header}>Bergen</h1>

        <p className={styles.paragraph}>
          Bergen is the Gateway to the Fjords of Norway and a UNESCO World
          Heritage City.
        </p>
        <Search />
      </div>
    </div>
  );
};

export default MobileHero;
