import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'react-date-range';
import DatePicker from 'react-datepicker';
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

  return (
    <div className={`${styles.inputContainer}`}>
      <label htmlFor={name} className={styles.label}>
        {getIcon(icon)}
        {label}
      </label>

      <DatePicker
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
        dateFormat='MMMM dd, yyyy'
      />

      {errors[name] && <div className={styles.error}>{errors[name]}</div>}
    </div>
  );
};

export default CalendarWrapper;
