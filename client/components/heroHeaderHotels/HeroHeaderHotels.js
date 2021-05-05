import SearchBar from '../form/searchBar/SearchBar';
import styles from './heroHeaderHotels.module.css';

const HeroHeaderHotels = () => {
  return (
    <section className={styles.searchHero}>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
    </section>
  );
};

export default HeroHeaderHotels;
