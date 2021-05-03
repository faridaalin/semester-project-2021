import Search from '../form/search/Search';
import styles from './heroHeaderHotels.module.css';

const HeroHeaderHotels = () => {
  return (
    <section className={styles.searchHero}>
      <div className={styles.searchContainer}>
        <Search />
      </div>
    </section>
  );
};

export default HeroHeaderHotels;
