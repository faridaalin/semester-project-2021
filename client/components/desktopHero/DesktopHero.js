import React from 'react';
import Search from '../form/search/Search';
import styles from './desktopHero.module.css';

const DesktopHero = () => {
  return (
    <section className={styles.desktopHero}>
      <div className={styles.imgContainer}>
        <img src={'/hero-desktop.png'} alt='Bergen City Harbour' />
      </div>
      <div className={styles.wrapper}>
        <span className={styles.desktopExplore}>Explore</span>
        <h1 className={styles.dekstopHeader}>Bergen</h1>
        <p className={styles.desktopParagraph}>
          Bergen is the Gateway to the Fjords of Norway. As a UNESCO World
          Heritage City and a European City of Culture, the Bergen region has
          the ideal combination of nature, culture and exciting urban life all
          year around.
        </p>

        <div className={styles.desktopContent}>
          <Search />
        </div>
      </div>
    </section>
  );
};

export default DesktopHero;
