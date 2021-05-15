import SearchBar from '../form/searchBar/SearchBar';
import styles from './heroHeaderHotels.module.css';

const HeroHeaderHotels = ({ content, setContent }) => {
  return (
    <section className={styles.searchHero}>
      <div className={styles.searchContainer}>
        <SearchBar content={content} setContent={setContent} />
      </div>
    </section>
  );
};

export default HeroHeaderHotels;
