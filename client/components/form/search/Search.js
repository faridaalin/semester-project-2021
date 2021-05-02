import { useState } from 'react';
import { MapPin, Calendar, Users } from 'react-feather';
import moment from 'moment';
import Button from '../../button/Button';
import Guests from './guest/Guests';
import styles from './search.module.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { X } from 'react-feather';

const Search = () => {
  const intitalDateRange = [
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ];
  const [showGuests, setShowGuests] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [resetDateInput, setResetDateInput] = useState('Add dates');
  const [dateRage, setDateRange] = useState(intitalDateRange);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const closeModal = () => {
    setCalendar(false);
  };
  const handleDateReset = () => {
    setResetDateInput('Add dates');
    setDateRange(intitalDateRange);
  };

  const formatDates = (startDate, endDate) => {
    return `${moment(startDate).add(10, 'days').calendar()} - ${moment(endDate)
      .add(10, 'days')
      .calendar()}`;
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

          <input
            type='button'
            value={
              !dateRage[0].endDate
                ? 'Add dates'
                : `${formatDates(dateRage[0].startDate, dateRage[0].endDate)}`
            }
            className={styles.inputButton}
            onClick={() => setCalendar(!calendar)}
          />

          {calendar && (
            <div className={styles.dateRange}>
              <button className={styles.closeModel}>
                <X className={styles.closeicon} onClick={closeModal} />
              </button>
              <button onClick={handleDateReset}>Clear</button>
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
