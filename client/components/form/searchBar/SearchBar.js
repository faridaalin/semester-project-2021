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
import { parseISO, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from '../input/input.module.css';
import searchStyles from './searchBar.module.css';
import searchStylesHome from '../search/searchFormHome.module.css';

const SearchBar = ({ content, searchMatch, setSearchMatch, datepicker }) => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const intitalDateRange = [
    {
      startDate: today,
      endDate: tomorrow,
      key: 'selection',
    },
  ];

  const [startDate, setStartDate] = useState(today.toDateString());
  const [endDate, setEndDate] = useState(tomorrow.toDateString());
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState(1);
  const [calendar, setCalendar] = useState(false);
  const [dateRange, setDateRange] = useState(intitalDateRange);
  const [search, setSearch] = useState('');
  const [clickedTypeahead, setClickedTypeahead] = useState('');
  const [display, setDisplay] = useState(false);

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

  const onSubmit = (values, onSubmitProps) => {
    const { validateForm } = onSubmitProps;
    validateForm(values);

    if (router.pathname !== '/hotels') router.replace('/hotels');
  };

  const closeModal = () => {
    setCalendar(false);
  };

  const handleSearchChange = (e) => {
    setSearch(searchRef.current.value.trim());
    let text = e.target.value;

    let matches = content?.filter((hotel) => {
      return (
        hotel.title.toLowerCase().includes(text.toLowerCase()) ||
        hotel.category.toLowerCase().includes(text.toLowerCase())
      );
    });

    if (matches.length > 0) {
      setSearchMatch(matches);
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const handleClickedSearch = (value) => {
    let matches = content?.filter((hotel) => {
      return (
        hotel.title.toLowerCase().includes(value.toLowerCase()) ||
        hotel.category.toLowerCase().includes(value.toLowerCase())
      );
    });

    if (matches.length > 0) {
      setSearchMatch(matches);
      setDisplay(true);
    } else {
      setDisplay(false);
    }
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

  console.log('pathname', router.pathname !== '/hotels');

  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={searchSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
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
            {datepicker ? (
              <DateWrapperHome
                calendar={calendar}
                setCalendar={setCalendar}
                dateRange={dateRange}
                setDateRange={setDateRange}
                guests={guests}
                setShowGuests={setShowGuests}
                setGuests={setGuests}
                calendarContainer={calendarContainer}
                closeModal={closeModal}
              />
            ) : (
              <>
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

const DateWrapperHome = ({
  dateRange,
  setDateRange,
  calendar,
  setCalendar,
  guests,
  showGuests,
  setShowGuests,
  calendarContainer,
  closeModal,
}) => {
  return (
    <div className={searchStylesHome.column}>
      <div>
        <label htmlFor='dates' className={searchStylesHome.label}>
          <Calendar className={searchStylesHome.icon} />
          Dates
        </label>

        <input
          name='dates'
          type='button'
          value={
            !dateRange[0].endDate
              ? 'Add dates'
              : `${(dateRange[0].startDate, dateRange[0].endDate)}`
          }
          className={searchStylesHome.inputButton}
          onClick={() => setCalendar(!calendar)}
        />

        {calendar && (
          <div className={searchStylesHome.dateRange} ref={calendarContainer}>
            <div className={searchStylesHome.removeIcons}>
              <div className={searchStylesHome.closeModel}>
                <X
                  className={searchStylesHome.closeicon}
                  onClick={closeModal}
                />
              </div>
              <button
                onClick={() => setDateRange(intitalDateRange)}
                className={searchStylesHome.clearButton}
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
        <label htmlFor='guests' className={searchStylesHome.label}>
          <Users className={searchStylesHome.icon} />
          Guests
        </label>
        <input
          name='guests'
          type='button'
          value={guests >= 1 ? guests : 1}
          className={searchStylesHome.inputButton}
          onClick={() => setShowGuests(!showGuests)}
        />

        {showGuests && (
          <Guests
            setShowGuests={setShowGuests}
            setGuests={setGuests}
            wrapper={guestContainer}
          />
        )}
      </div>
    </div>
  );
};
