import React from 'react';
import Search from '../form/search/Search';
import styles from './desktopHero.module.css';

const DesktopHero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src='/hero-desktop.png' alt='Bergen City Harbour' />
      </div>
      <div className={styles.content}>
        <span>Explor</span>
        <h1>Bergen</h1>
        <p>
          Bergen is the Gateway to the Fjords of Norway. As a UNESCO World
          Heritage City and a European City of Culture, the Bergen region has
          the ideal combination of nature, culture and exciting urban life all
          year around.
        </p>
        <Search />
      </div>
    </div>
  );
};

export default DesktopHero;
