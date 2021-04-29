import { useState } from 'react';
import { MapPin, Calendar, Users } from 'react-feather';
import Button from '../../button/Button';
import { DateRangePicker } from 'rsuite';
import Guests from './guest/Guests';
import 'rsuite/dist/styles/rsuite-default.css';
import styles from './search.module.css';

const Search = () => {
  const [showGuests, setShowGuests] = useState(true);
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSearch}>
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
          <DateRangePicker
            oneTap
            appearance='default'
            placeholder='Add date'
            className={styles.datepicker}
          />
        </div>
        <div>
          <label htmlFor='guests' className={styles.label}>
            <Users className={styles.icon} />
            Guests
          </label>
          <button
            className={styles.inputButton}
            onClick={() => setShowGuests(!showGuests)}
          >
            Add guests
          </button>
          {showGuests && <Guests s setShowGuests={setShowGuests} />}
        </div>
      </div>
      <Button btnType='search' className={styles.searchBtn}>
        Search
      </Button>
    </form>
  );
};

export default Search;
