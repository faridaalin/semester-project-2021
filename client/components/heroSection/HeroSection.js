import { useSearchContext } from '@/context/searchContext';
import { Media } from '@/context/Media';
import SearchBar from '../form/searchBar/SearchBar';
import styles from './heroSection.module.css';

const HeroSection = ({ hotels }) => {
  const { search, setSearch } = useSearchContext();
  const { data } = hotels;

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroImage}>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <span className={styles.explore}>Explore</span>
        <h1 className={styles.header}>Bergen</h1>

        <Media at='sm'>
          <p className={styles.paragraph}>
            Bergen is the Gateway to the Fjords of Norway and a UNESCO World
            Heritage City with combination of nature, culture and exciting urban
            life all year around.
          </p>
        </Media>
        <Media greaterThan='sm'>
          <p className={styles.paragraph}>
            Bergen is the Gateway to the Fjords of Norway. As a UNESCO World
            Heritage City and a European City of Culture, the Bergen region has
            the ideal combination of nature, culture and exciting urban life all
            year around.
          </p>
        </Media>

        <SearchBar
          content={data}
          searchMatch={search}
          setSearchMatch={setSearch}
          datepicker
        />
      </div>
    </section>
  );
};

export default HeroSection;
