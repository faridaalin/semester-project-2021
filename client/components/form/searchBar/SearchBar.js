import { useState, useRef, useEffect } from 'react';
import { Formik, Form } from 'formik';
import DateWrapper from '../../form/date/Date';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import searchSchema from '../../../validationSchema/searchSchema';
import styles from './searchBar.module.css';

const SearchBar = ({ content }) => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [startDate, setStartDate] = useState(today.toDateString());
  const [endDate, setEndDate] = useState(tomorrow.toDateString());

  const suggestionsContainer = useRef(null);
  const calendarContainer = useRef(null);
  const guestContainer = useRef(null);

  const initialFormData = {
    search: '',
    check_in: startDate,
    check_out: endDate,
    adults: 1,
    children: 0,
  };
  const onSubmit = async (values, onSubmitProps) => {
    console.log('values', values);
  };
  const handleSearchChange = () => {
    setSearch(input.current.value.trim());
    const text = input.current.value;
    let matches = hotels?.filter((hotel) => {
      const regex = new RegExp(`${text}`, 'gi');
      return hotel.title.match(regex) || hotel.category.match(regex);
    });

    if (matches.length > 0) {
      setSearchMatch(matches);
      setDisplay(true);
    } else {
      setSearchMatch(hotels);
      setDisplay(true);
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
        console.log('Formik', formik);
        return (
          <Form className={`${styles.form}`}>
            <DefaultInput
              type='search'
              name='search'
              placeholder='Search for hotels in Bergen..'
              label='Location'
              icon='pin'
              customContainer={styles.customContainer}
            />

            <div className={`${styles.column} `}>
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

            <div className={`${styles.column} `}>
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
            <div className={styles.btnContainer}>
              <Button
                btnType='search'
                submit
                customBtnClass={styles.customBtnClass}
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
