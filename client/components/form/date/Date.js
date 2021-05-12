import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import dateFormat from 'dateformat';
import { getIcon } from '../input/Input';

import styles from '../input/input.module.css';

const DateWrapper = (props) => {
  const { label, selectedDate, setDateFunc, icon, name, placeholder } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const handleDateSelection = (date) => {
    setDateFunc(new Date(date));
  };

  return (
    <div className={`${styles.inputContainer} `}>
      <label htmlFor={name} className={styles.label}>
        {getIcon(icon)}
        {label}
      </label>
      <DatePicker
        {...field}
        onChange={(val) => {
          setDateFunc(new Date(val));
          setFieldValue(field.name, val);
        }}
        selected={(field.value && new Date(field.value)) || null}
        startDate={selectedDate}
        className={styles.input}
        minDate={new Date()}
        name={name}
        placeholderText={placeholder}
      />
    </div>
  );
};

export default DateWrapper;
