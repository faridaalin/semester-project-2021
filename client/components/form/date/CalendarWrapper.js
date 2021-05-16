import { useState, useEffect } from 'react';
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
  } = props;
  const { setFieldValue, errors, touched, handleBlur } = useFormikContext();
  const [field] = useField(props);
  const [calendarDate, setCalendarDate] = useState(false);
  const handleClickOutside = (e) => {
    const wrapper = calendarContainer.current;

    if (wrapper && !wrapper.contains(e.target)) {
      setCalendarDate(false);
    }
  };
  const closeModal = () => {
    setCalendarDate(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  console.log('field', field);

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
        onClick={() => {
          setCalendarDate(!calendarDate);
        }}
      />
      {calendarDate && (
        <div className={searchStylesHome.dateRange} ref={calendarContainer}>
          <div className={searchStylesHome.removeIcons}>
            <div className={searchStylesHome.closeModel}>
              <button onClick={closeModal}>
                <X className={searchStylesHome.closeicon} />
              </button>
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
              console.log(field.name, val);
              setFieldValue(field.name, field.value);
            }}
            // onChange={(val) => {
            //   console.log(field.name, val);
            //   setDateFunc(val);
            //   setFieldValue(field.name, val);
            // }}
            // onBlur={handleBlur}
            className={`${styles.input}`}
            name={name}
            placeholderText={placeholder}
            {...field}
          />
        </div>
      )}

      {errors[name] && <div className={styles.error}>{errors[name]}</div>}
    </div>
  );
};

export default CalendarWrapper;

{
  /* <DatePicker
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
      /> */
}
