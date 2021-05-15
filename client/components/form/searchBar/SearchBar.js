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

const SearchBar = ({ content, setContent, searchMatch, setSearchMatch }) => {
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

  const [search, setSearch] = useState('');
  const [clickedTypeahead, setClickedTypeahead] = useState('');
  const [display, setDisplay] = useState(false);
  // const [hotels, setHotels] = useHotelsContext();

  const searchRef = useRef(null);
  const suggestionsContainer = useRef(null);
  const calendarContainer = useRef(null);
  const guestContainer = useRef(null);

  const router = useRouter();

  const initialFormData = {
    search: search,
    check_in: startDate,
    check_out: endDate,
    adults: 1,
    children: 0,
  };

  const onSubmit = () => {
    if (search === '') {
      setSearchMatch(content);
    }
    if (router.pathname !== '/hotels') router.replace('/hotels');
  };
  const closeModal = () => {
    setCalendar(false);
  };
  const clonedHotels = [...content];
  const handleSearchChange = (e) => {
    setSearch(searchRef.current.value.trim());
    let text = e.target.value;
    console.log('text tom', text === '');
    console.log('text OUTSIDE', text);
    console.log('matches BEGIN', matches);
    console.log('content BEGIN', content);
    console.log('clone', clonedHotels);

    let matches = content?.filter((hotel) => {
      return (
        hotel.title.toLowerCase().includes(text.toLowerCase()) ||
        hotel.category.toLowerCase().includes(text.toLowerCase())
      );
    });
    console.log('matches LATEST', matches);

    console.log('LENGTH🔥', matches.length);

    if (matches.length > 0) {
      setSearchMatch(matches);
      setDisplay(true);
      console.log('SHOW MATCHES');
    } else {
      setDisplay(false);
      console.log('HIDE ...!!');
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
  // useEffect(() => {
  //   setHotels(content);
  // }, []);

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
                id='search'
                value={search}
                placeholder='Search for hotels in Bergen..'
                className={styles.input}
                onInput={(e) => handleSearchChange(e)}
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
