import { useState, useEffect } from 'react';
import getWindowWidth from '../helpers/getWindowWidth';
import Search from '../form/search/Search';
import styles from './mobileHero.module.css';

const MobileHero = () => {
  const breakpoint = 768;
  const [width, setWidth] = useState(getWindowWidth());
  useEffect(() => {
    const showDesktopHero = () => {
      if (getWindowWidth() >= breakpoint) {
        setWidth(getWindowWidth());
      } else {
        setWidth(getWindowWidth());
      }
    };
    window.addEventListener('resize', showDesktopHero);
    return () => {
      window.removeEventListener('resize', showDesktopHero);
    };
  }, [width]);

  console.log('width', width);
  console.log('width >= breakpoint', width >= breakpoint);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroImage}>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <span className={styles.explore}>Explore</span>
        <h1 className={styles.header}>Bergen</h1>

        <p className={styles.paragraph}>
          {width < breakpoint
            ? ' Bergen is the Gateway to the Fjords of Norway and a UNESCO World Heritage City.'
            : '  Bergen is the Gateway to the Fjords of Norway. As a UNESCO World Heritage City and a European City of Culture, the Bergen region has the ideal combination of nature, culture and exciting urban life all year around.'}
        </p>

        <Search />
      </div>
    </section>
  );
};

export default MobileHero;
