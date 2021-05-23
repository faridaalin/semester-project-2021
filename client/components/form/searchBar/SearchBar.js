import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { MapPin, Moon } from 'react-feather';
import searchSchema from '@/validationSchema/searchSchema';
import searchSchemaSimple from '@/validationSchema/searchSchemaSimple';
import CalendarWrapper from '../date/CalendarWrapper';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import DateRangeWrapper from '../date/DateRangeWrapper';
import styles from './searchBar.module.css';

const SearchBar = ({ content, searchMatch, setSearchMatch, datepicker }) => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [showGuests, setShowGuests] = useState(false);
  const [search, setSearch] = useState('');
  const [clickedTypeahead, setClickedTypeahead] = useState('');
  const [display, setDisplay] = useState(false);
  const [calendarEnd, setCalendarStart] = useState(false);
  const [calendarStart, setCalendarEnd] = useState(false);
  const [calendar, setCalendar] = useState(false);

  const searchRef = useRef(null);
  const suggestionsContainer = useRef(null);
  const calendarContainer = useRef(null);
  const startContainer = useRef(null);
  const endContainer = useRef(null);
  const guestContainer = useRef(null);

  const router = useRouter();

  const initialFormData = {
    search: search,
    check_in: startDate,
    check_out: endDate,
    adults: 1,
    children: 0,
  };

  const getMatches = (content, value) => {
    let matches = content?.filter((hotel) => {
      return (
        hotel.title.toLowerCase().includes(value.toLowerCase()) ||
        hotel.category.toLowerCase().includes(value.toLowerCase())
      );
    });
    return matches;
  };

  const onSubmit = (values, onSubmitProps) => {
    const { validateForm } = onSubmitProps;
    validateForm(values);
  };
  const handleSubmitButton = () => {
    if (search === '') {
      setSearchMatch(content);
    } else {
      setSearchMatch(searchMatch);
    }

    if (router.pathname !== '/hotels') router.replace('/hotels');
  };

  const handleSearchChange = (e) => {
    setSearch(searchRef.current.value.trim());
    let { value } = e.target;

    let matches = getMatches(content, value);

    if (matches.length > 0) {
      setSearchMatch(matches);
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const handleClickedSearch = (value) => {
    setSearch(value);

    let matches = getMatches(content, value);

    if (matches.length > 0) {
      setSearchMatch(matches);
      setDisplay(true);
    } else {
      setDisplay(false);
    }
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
      setCalendarStart(false);
      setCalendarEnd(false);
      setShowGuests(false);
      setCalendar(false);
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
      validationSchema={datepicker ? searchSchemaSimple : searchSchema}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form className={` ${datepicker ? styles.formHome : styles.form}`}>
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
            {datepicker ? (
              <>
                <DateRangeWrapper
                  calendarContainer={calendarContainer}
                  setShowGuests={setShowGuests}
                  showGuests={showGuests}
                  guestContainer={guestContainer}
                  setCalendar={setCalendar}
                  calendar={calendar}
                />
              </>
            ) : (
              <>
                <div className={`${styles.column} `}>
                  <CalendarWrapper
                    name='check_in'
                    label='Check In'
                    selectedDate={startDate}
                    setDateFunc={setStartDate}
                    icon='dates'
                    placeholder='Add date'
                    calendarContainer={startContainer}
                  />

                  <CalendarWrapper
                    name='check_out'
                    label='Check Out'
                    selectedDate={endDate}
                    setDateFunc={setEndDate}
                    icon='dates'
                    placeholder='Add date'
                    calendarContainer={endContainer}
                  />
                </div>
                <div className={`${styles.column} `}>
                  <DefaultInput
                    type='number'
                    name='adults'
                    value='1'
                    label='Adults'
                    smallLabel='18 or above'
                    icon='users'
                    placeholder='Adults'
                    customClass={styles.guestsInput}
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
                    customClass={styles.guestsInput}
                    min='0'
                    max='100'
                  />
                </div>
              </>
            )}

            <div className={styles.btnContainer}>
              <Button
                btnType='search'
                submit
                customBtnClass={styles.customBtnClass}
                clickHandler={handleSubmitButton}
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
