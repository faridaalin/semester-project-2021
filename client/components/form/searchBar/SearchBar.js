import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { MapPin, Calendar, Users, X, Moon } from 'react-feather';
import searchSchema from '../../../validationSchema/searchSchema';
import DateWrapper from '../../form/date/Date';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import Guests from '../guest/Guests';
import { useHotelsContext } from '../../../context/HotelsContext';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from '../input/input.module.css';
import searchStyles from './searchBar.module.css';

const SearchBar = ({ content }) => {
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

  const [startDate, setStartDate] = useState(today.toDateString());
  const [endDate, setEndDate] = useState(tomorrow.toDateString());
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState(1);
  const [calendar, setCalendar] = useState(false);
  const [dateRage, setDateRange] = useState(intitalDateRange);
  const [searchMatch, setSearchMatch] = useState(null);
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const [hotels, setHotels] = useHotelsContext();

  const searchRef = useRef(null);
  const suggestionsContainer = useRef(null);
  const calendarContainer = useRef(null);
  const guestContainer = useRef(null);
  const formRef = useRef(null);

  const router = useRouter();

  const initialFormData = {
    search: '',
    check_in: startDate,
    check_out: endDate,
    adults: 1,
    children: 0,
  };

  const onSubmit = (values, onSubmitProps) => {
    const text = search !== '' ? search : searchRef.current.value;
    console.log('searchMatch', searchMatch);
    console.log('search', search);
    console.log('searchRef.current.value', searchRef.current.value);
    console.log('text', text);
    let matches = hotels?.filter((hotel) => {
      const regex = new RegExp(`${text}`, 'gi');
      return hotel.title.match(regex) || hotel.category.match(regex);
    });

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
  useEffect(() => {
    setHotels(content);
  }, []);
  const handleSearchChange = (e) => {
    const text = search !== '' ? search : searchRef.current.value;
    let matches = hotels?.filter((hotel) => {
      const regex = new RegExp(`${text}`, 'gi');
      return hotel.title.match(regex) || hotel.category.match(regex);
    });

    if (matches.length > 0) {
      setSearchMatch(matches);
      setDisplay(true);
    }
    // else {
    //   setSearchMatch(hotels);
    //   setDisplay(true);
    // }
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={searchSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className={`${searchStyles.form}`}>
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

              {display && searchMatch.length > 0 && (
                <div
                  className={searchStyles.suggestions}
                  ref={suggestionsContainer}
                >
                  {searchMatch.map((value, index) => {
                    return (
                      <div
                        className={searchStyles.suggestionItem}
                        key={index}
                        onClick={() => handleClickedSearch(value.title)}
                      >
                        <span>
                          <Moon className={searchStyles.icon} /> {value.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className={`${searchStyles.column} `}>
              <DateWrapper
                name='check_in'
                label='Check In'
                selectedDate={startDate}
                setDateFunc={setStartDate}
                icon='dates'
                placeholder='Add date'
              />
              <DateWrapper
                name='check_out'
                label='Check Out'
                selectedDate={endDate}
                setDateFunc={setEndDate}
                icon='dates'
                placeholder='Add date'
              />
            </div>

            <div className={`${searchStyles.column} `}>
              <DefaultInput
                type='number'
                name='adults'
                value='1'
                label='Adults'
                smallLabel='18 or above'
                icon='users'
                placeholder='Adults'
                min='1'
                max='100'
              />
              <DefaultInput
                type='number'
                name='children'
                value='0'
                label='Children'
                smallLabel='12 or above'
                icon='users'
                placeholder='Children'
                min='0'
                max='100'
              />
            </div>
            <div className={searchStyles.btnContainer}>
              <Button
                btnType='search'
                submit
                customBtnClass={searchStyles.customBtnClass}
                // clickHandler={() => console.log('CLICKED')}
              >
                Search
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchBar;
