import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { Calendar } from 'react-date-range';
import { X } from 'react-feather';
import { useField, useFormikContext } from 'formik';
import { getIcon } from '../input/Input';
import styles from '../input/input.module.css';
import searchStylesHome from '../search/searchFormHome.module.css';

const CalendarWrapper = (props) => {
  const {
    calendarContainer,
    label,
    selectedDate,
    setDateFunc,
    icon,
    name,
    placeholder,
    setCalendar,
    calendar,
  } = props;
  const { setFieldValue, errors, touched, handleBlur } = useFormikContext();
  const [field] = useField(props);

  const closeModal = () => {
    setCalendar(false);
  };

  return (
    <div className={`${styles.inputContainer} `}>
      <label htmlFor={name} className={styles.label}>
        {getIcon(icon)}
        {label}
      </label>
      <input
        name='dates'
        type='button'
        value={
          !selectedDate
            ? 'Add dates'
            : `${format(new Date(selectedDate), 'LLL dd yyyy')}`
        }
        className={styles.input}
        onClick={() => setCalendar(!calendar)}
      />
      {calendar && (
        <div className={searchStylesHome.dateRange} ref={calendarContainer}>
          <div className={searchStylesHome.removeIcons}>
            <div className={searchStylesHome.closeModel}>
              <X className={searchStylesHome.closeicon} onClick={closeModal} />
            </div>
            <button
              onClick={() => setDateFunc(selectedDate)}
              className={searchStylesHome.clearButton}
            >
              Clear
            </button>
          </div>
          <Calendar
            date={new Date()}
            minDate={new Date()}
            startDate={selectedDate}
            onChange={(val) => {
              setDateFunc(val);
              setFieldValue(field.name, val);
            }}
            onBlur={handleBlur}
            className={`${styles.input}`}
            name={name}
            placeholderText={placeholder}
            {...field}
          />
        </div>
      )}

      {/* <DatePicker
        {...field}
        onChange={(val) => {
          setDateFunc(val);
          setFieldValue(field.name, val);
        }}
        onBlur={handleBlur}
        selected={(field.value && new Date(field.value)) || null}
        startDate={selectedDate}
        className={`${styles.input}`}
        minDate={new Date()}
        name={name}
        placeholderText={placeholder}
      /> */}

      {errors[name] && <div className={styles.error}>{errors[name]}</div>}
    </div>
  );
};

export default CalendarWrapper;
