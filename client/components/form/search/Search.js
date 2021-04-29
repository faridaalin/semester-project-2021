import { MapPin, Calendar, Users } from 'react-feather';
import Button from '../../button/Button';
import styles from './search.module.css';

const Search = () => {
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor='search' className={styles.label}>
          <MapPin className={styles.icon} />
          Location
        </label>
        <input
          type='search'
          name='search'
          id='serach'
          placeholder='Where do you want to stay?'
          className={styles.input}
        />
      </div>
      <div className={styles.column}>
        <div>
          <label htmlFor='dates' className={styles.label}>
            <Calendar className={styles.icon} />
            Dates
          </label>
          <button className={`${styles.inputButton}`}>Add dates</button>
        </div>
        <div>
          <label htmlFor='guests' className={styles.label}>
            <Users className={styles.icon} />
            Guests
          </label>
          <input
            type='number'
            name='guests'
            id='guests'
            placeholder='Add guests'
            className={styles.input}
          />
        </div>
      </div>
      <Button btnType='search' className={styles.searchBtn}>
        Search
      </Button>
    </form>
  );
};

export default Search;
