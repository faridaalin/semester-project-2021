import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { MapPin, Calendar, Users, X, Moon } from 'react-feather';
import Button from '../../button/Button';
import Guests from './guest/Guests';
import { useHotelsContext } from '../../../context/HotelsContext';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './searchFormHome.module.css';

const Search = ({ content }) => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const intitalDateRange = [
    {
      startDate: today.toDateString(),
      endDate: tomorrow.toDateString(),
      key: 'selection',
    },
  ];
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState(1);
  const [calendar, setCalendar] = useState(false);
  const [dateRange, setDateRange] = useState(intitalDateRange);
  const [searchMatch, setSearchMatch] = useState(null);
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const [errors, setErrors] = useState({});

  const [hotels, setHotels] = useHotelsContext();

  const searchRef = useRef(null);
  const suggestionsContainer = useRef(null);
  const calendarContainer = useRef(null);
  const guestContainer = useRef(null);
  const formRef = useRef(null);

  const router = useRouter();

  let schema = yup.object().shape({
    search: yup.string().optional(),
    guests: yup
      .number()
      .required('Must be greater than 0')
      .positive()
      .integer(),
    dates: yup.date(),
  });

  const handleSearch = (e) => {
    e.preventDefault();

    if (!dateRange[0].endDate || guests < 1) {
      schema
        .validate({
          search: search,
          guests: guests,
          dates: dateRange[0].endDate,
        })
        .catch(function (err) {
          setErrors({ name: err.name, message: err.errors });
        });
      return;
    }
    if (search === '') {
      setSearchMatch(content);
    } else {
      setHotels(searchMatch);
    }
    if (router.pathname !== '/hotels') router.replace('/hotels');
  };

  const closeModal = () => {
    setCalendar(false);
  };

  const formatDates = (startDate, endDate) => {
    return `${startDate} - ${endDate}`;
  };

  const handleSearchChange = () => {
    setSearch(searchRef.current.value.trim());
    const text = searchRef.current.value;
    let matches = hotels?.filter((hotel) => {
      const regex = new RegExp(`${text}`, 'gi');
      console.log(
        'hotel.title.match(regex) || hotel.category.match(regex)',
        hotel.title.match(regex) || hotel.category.match(regex)
      );
      return hotel.title.match(regex) || hotel.category.match(regex);
    });

    console.log('matches home', matches);

    if (matches.length > 0) {
      setSearchMatch(matches);
      setDisplay(true);
    } else {
      setSearchMatch(hotels);
      setDisplay(false);
    }
  };

  const handleClickedSearch = (value) => {
    setSearch(value);
    setDisplay(!display);
  };
  const handleClickOutside = (e) => {
    const suggestionWrapper = suggestionsContainer.current;
    const calendarWrapper = calendarContainer.current;
    const guestWrapper = guestContainer.current;

    if (
      (suggestionWrapper && !suggestionWrapper.contains(e.target)) ||
      (calendarWrapper && !calendarWrapper.contains(e.target)) ||
      (guestWrapper && !guestWrapper.contains(e.target))
    ) {
      setDisplay(false);
      setCalendar(false);
      setShowGuests(false);
    }
  };

  useEffect(() => {
    setHotels(content);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const getErrorField = (errors) => {
    let errorField;

    if (errors && errors.name) {
      const name =
        errors.message !== undefined && errors.message[0].split(' ')[0];
      if (name === 'search')
        errorField = { name: 'search', msg: 'This field must have a value' };
      if (name === 'guests')
        errorField = { name: 'guests', msg: 'Gueste must be greater than 0' };
      if (name === 'dates')
        errorField = { name: 'dates', msg: 'Invalid date(s).' };
    }
    return errorField;
  };

  return (
    <form className={styles.form} ref={formRef}>
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
          placeholder='Search for hotels in Bergen..'
          className={styles.input}
          onChange={handleSearchChange}
          ref={searchRef}
        />
        {getErrorField(errors)?.name &&
          getErrorField(errors)?.name === 'search' && (
            <span>{getErrorField(errors).msg}</span>
          )}

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
            name='dates'
            type='button'
            value={
              !dateRange[0].endDate
                ? 'Add dates'
                : `${formatDates(dateRange[0].startDate, dateRange[0].endDate)}`
            }
            className={styles.inputButton}
            onClick={() => setCalendar(!calendar)}
          />
          {getErrorField(errors)?.name &&
            getErrorField(errors)?.name === 'dates' && (
              <span>{getErrorField(errors).msg}</span>
            )}

          {calendar && (
            <div className={styles.dateRange} ref={calendarContainer}>
              <div className={styles.removeIcons}>
                <div className={styles.closeModel}>
                  <X className={styles.closeicon} onClick={closeModal} />
                </div>
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
                minDate={new Date()}
                ranges={dateRange}
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
            name='guests'
            type='button'
            value={guests >= 1 ? guests : 1}
            className={styles.inputButton}
            onClick={() => setShowGuests(!showGuests)}
          />
          {getErrorField(errors)?.name &&
            getErrorField(errors).name === 'guests' && (
              <span>{getErrorField(errors).msg}</span>
            )}

          {showGuests && (
            <Guests
              setShowGuests={setShowGuests}
              setGuests={setGuests}
              wrapper={guestContainer}
            />
          )}
        </div>
      </div>
      <Button
        btnType='search'
        className={styles.searchBtn}
        clickHandler={handleSearch}
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
