import { useState } from 'react';
import { MapPin, Calendar, Users } from 'react-feather';
import Button from '../../button/Button';
import Guests from './guest/Guests';
import styles from './search.module.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { X } from 'react-feather';

const Search = () => {
  const [showDates, setShowDates] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [dateRage, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const closeModal = () => {
    setShowDates(false);
  };
  console.log('showDates', showDates);

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

          <input
            type='button'
            value='Add dates'
            className={styles.inputButton}
            onClick={() => setShowDates(!showDates)}
          />

          {showDates && (
            <div className={styles.dateRange}>
              <button className={styles.closeModel}>
                <X className={styles.closeicon} onClick={closeModal} />
              </button>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRage}
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor='guests' className={styles.label}>
            <Users className={styles.icon} />
            Guests
          </label>
          <input
            type='button'
            value='Add guests'
            className={styles.inputButton}
            onClick={() => setShowGuests(!showGuests)}
          />

          {showGuests && <Guests setShowGuests={setShowGuests} />}
        </div>
      </div>
      <Button btnType='search' className={styles.searchBtn}>
        Search
      </Button>
    </form>
  );
};

export default Search;
