import { MapPin, Calendar, Users } from 'react-feather';
import styles from './serach.module.css';

const Search = () => {
  return (
    <form className={styles.form}>
      <div>
        <label htmlFor='search' className={styles.label}>
          <MapPin className={styles.icon} />
          Location
        </label>
        <input type='search' name='search' id='serach' />
      </div>
      <div>
        <label htmlFor='dates' className={styles.label}>
          <Calendar className={styles.icon} />
          Dates
        </label>
        <input type='date' name='dates' id='dates' />
      </div>
      <div>
        <label htmlFor='guests' className={styles.label}>
          <Users className={styles.icon} />
          Guests
        </label>
        <input type='number' name='guests' id='guests' />
      </div>
      <button>Search</button>
    </form>
  );
};

export default Search;
