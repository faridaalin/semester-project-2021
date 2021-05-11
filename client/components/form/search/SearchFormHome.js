import { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Users, X, Moon } from 'react-feather';
import dateFormat from 'dateformat';
import Button from '../../button/Button';
import Guests from './guest/Guests';
import { useHotelsContext } from '../../../context/HotelsContext';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './searchFormHome.module.css';

const intitalDateRange = [
  {
    startDate: new Date(),
    endDate: null,
    key: 'selection',
  },
];
const Search = ({ content }) => {
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState(null);
  const [calendar, setCalendar] = useState(false);
  const [dateRage, setDateRange] = useState(intitalDateRange);
  const [searchMatch, setSearchMatch] = useState(null);
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);

  const [hotels, setHotels] = useHotelsContext();
  const input = useRef(null);
  const suggestionsContainer = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const closeModal = () => {
    setCalendar(false);
  };

  const formatDates = (startDate, endDate) => {
    return `${dateFormat(`${startDate}`, 'mm/dd/yyyy')} - ${dateFormat(
      `${endDate}`,
      'mm/dd/yyyy'
    )}`;
  };
  useEffect(() => {
    setHotels(content.data);
  }, []);

  const handleSearchChange = () => {
    setSearch(input.current.value);
    const text = input.current.value;
    let matches = hotels.filter((hotel) => {
      const regex = new RegExp(`${text}`, 'gi');
      return (
        hotel.title.match(regex) ||
        hotel.category.match(regex) ||
        hotel.title.toLowerCase().includes(text.toLowerCase())
      );
    });

    if (matches.length > 0) {
      setSearchMatch(matches);
      setDisplay(true);
    }
  };
  const handleClickedSearch = (value) => {
    setSearch(value);
    setDisplay(!display);
  };
  const handleClickOutside = (e) => {
    const { current } = suggestionsContainer;
    if (current && !current.contains(e.target)) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <div className={`${styles.inputContainer} ${styles.searchInput}`}>
        <label htmlFor='search' className={styles.label}>
          <MapPin className={styles.icon} />
          Location
        </label>
        <input
          autoComplete='false'
          autoComplete='off'
          type='search'
          name='search'
          id='serach'
          value={search}
          placeholder='Where do you want to stay?'
          className={styles.input}
          onChange={handleSearchChange}
          ref={input}
        />
        {display && searchMatch.length > 0 && (
          <div className={styles.suggestions} ref={suggestionsContainer}>
            {searchMatch.map((value, index) => {
              return (
                <div
                  className={styles.suggestionItem}
                  key={index}
                  onClick={() => handleClickedSearch(value.title)}
                >
                  <span>
                    <Moon className={styles.icon} /> {value.title}
                  </span>
                </div>
              );
            })}
          </div>
        )}
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
              <div className={styles.removeIcons}>
                <button className={styles.closeModel}>
                  <X className={styles.closeicon} onClick={closeModal} />
                </button>
                <button
                  onClick={() => setDateRange(intitalDateRange)}
                  className={styles.clearButton}
                >
                  Clear
                </button>
              </div>
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
            value={guests >= 1 ? guests : 'Add guests'}
            className={styles.inputButton}
            onClick={() => setShowGuests(!showGuests)}
          />

          {showGuests && (
            <Guests setShowGuests={setShowGuests} setGuests={setGuests} />
          )}
        </div>
      </div>
      <Button btnType='search' className={styles.searchBtn}>
        Search
      </Button>
    </form>
  );
};

export default Search;
