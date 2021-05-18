import { useEffect } from 'react';
import { useHotelsContext } from '../../context/HotelsContext';
import SearchBar from '../form/searchBar/SearchBar';
import styles from './heroHeaderHotels.module.css';

const HeroHeaderHotels = ({ content, searchMatch, setSearchMatch }) => {
  const [hotels, , getHotels] = useHotelsContext();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getHotels();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className={styles.searchHero}>
      <div className={styles.searchContainer}>
        <SearchBar
          content={content ? content : hotels}
          searchMatch={searchMatch}
          setSearchMatch={setSearchMatch}
        />
      </div>
    </section>
  );
};

export default HeroHeaderHotels;
