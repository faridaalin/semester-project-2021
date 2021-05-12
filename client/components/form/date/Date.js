import { useState } from 'react';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';
import { getIcon } from '../input/Input';

import styles from '../input/input.module.css';

const DateWrapper = ({
  name,
  label,
  selectedDate,
  setDateFunc,
  icon,
  placeholder,
}) => {
  const handleDateChange = (date) => {
    setDateFunc(new Date(date));
  };
  return (
    <div className={`${styles.inputContainer} `}>
      <label htmlFor={name} className={styles.label}>
        {getIcon(icon)}
        {label}
      </label>
      <DatePicker
        onChange={(date) => handleDateChange(date)}
        selected={selectedDate}
        startDate={selectedDate}
        className={styles.input}
        minDate={new Date()}
        placeholderText={placeholder}
      />
    </div>
  );
};

export default DateWrapper;
