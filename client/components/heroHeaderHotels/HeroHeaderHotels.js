// import SearchBar from '../form/searchBar/SearchBar';
// import SearchBar from '../form/search/SearchFormHome';
import SearchBar from '../form/searchBar/SearchBar';
import styles from './heroHeaderHotels.module.css';

const HeroHeaderHotels = ({ content }) => {
  return (
    <section className={styles.searchHero}>
      <div className={styles.searchContainer}>
        {/* <SearchBar content={content} /> */}
      </div>
    </section>
  );
};

export default HeroHeaderHotels;
