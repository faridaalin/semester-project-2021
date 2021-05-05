import { useState, useEffect } from 'react';
import useWindowWidth from '../../hooks/useWindowSize';
import getWindowWidth from '../../helpers/getWindowWidth';
import Search from '../form/search/Search';
import styles from './heroSection.module.css';

const HeroSection = () => {
  const breakpoint = 768;

  const [widthOnResize, resized] = useWindowWidth();
  const [widthOnLoad, setWidthOnLoad] = useState(null);

  useEffect(() => {
    const handlePageLoad = () => {
      setWidthOnLoad(window.innerWidth);
    };
    window.addEventListener('load', handlePageLoad);
    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, [setWidthOnLoad]);

  const showBackgroundImage = () => {
    if (resized === true) {
      if (widthOnResize >= breakpoint) {
        return {
          img: '/hero-desktop.png',
          text:
            'Bergen is the Gateway to the Fjords of Norway. As a UNESCO World Heritage City and a European City of Culture, the Bergen region has the ideal combination of nature, culture and exciting urban life all year around.',
        };
      } else {
        return {
          img: '/mobile-hero.png',
          text:
            'Bergen is the Gateway to the Fjords of Norway and a UNESCO World Heritage City.',
        };
      }
    }

    if (resized === false) {
      if (widthOnLoad >= breakpoint) {
        return {
          img: '/hero-desktop.png',
          text:
            'Bergen is the Gateway to the Fjords of Norway. As a UNESCO World Heritage City and a European City of Culture, the Bergen region has the ideal combination of nature, culture and exciting urban life all year around.',
        };
      } else {
        return {
          img: '/mobile-hero.png',
          text:
            'Bergen is the Gateway to the Fjords of Norway and a UNESCO World Heritage City.',
        };
      }
    }
  };

  return (
    <section className={styles.heroSection}>
      <div
        className={styles.heroImage}
        style={{
          backgroundImage: `url(${showBackgroundImage().img})`,
        }}
      >
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <span className={styles.explore}>Explore</span>
        <h1 className={styles.header}>Bergen</h1>

        <p className={styles.paragraph}>{`${showBackgroundImage().text}`}</p>

        <Search />
      </div>
    </section>
  );
};

export default HeroSection;
