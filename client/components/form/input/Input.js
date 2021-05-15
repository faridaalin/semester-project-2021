import { useState } from 'react';
import { Field } from 'formik';
import { MapPin, Calendar, Users, X, Moon } from 'react-feather';
import { DateRange } from 'react-date-range';
import moment from 'moment';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './input.module.css';

export const getIcon = (icon) => {
  switch (icon) {
    case 'pin':
      return <MapPin className={styles.icon} />;

    case 'dates':
      return <Calendar className={styles.icon} />;

    case 'users':
      return <Users className={styles.icon} />;
    case 'night':
      return <Moon className={styles.icon} />;

    default:
      return '';
  }
};

const DefaultInput = ({
  type,
  name,
  placeholder,
  label,
  smallLabel,
  icon,
  customClass,
  // customContainer,
  value,
  handleChange,
  handleBlur,
  min,
  max,
  readonly,
  searchRef,
}) => {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <div className={`${styles.inputContainer} `}>
            <label htmlFor={name} className={styles.label}>
              {getIcon(icon)}
              {label} <span className={styles.smallLabel}>{smallLabel}</span>
            </label>
            <input
              type={type}
              name={name}
              id={label}
              value={value ? value : ''}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`${styles.input} ${customClass} `}
              readOnly={readonly}
              min={min}
              max={max}
              ref={searchRef}
              {...field}
            />
            {meta.touched && meta.error && (
              <div className={styles.error}>{meta.error}</div>
            )}
          </div>
        );
      }}
    </Field>
  );
};

const InputCalendar = ({
  type,
  name,
  label,
  value,
  icon,
  calendarType,
  handleChange,
}) => {
  const intitalDateRange = [
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ];

  const [calendar, setCalendar] = useState(false);
  const [dateRage, setDateRange] = useState(intitalDateRange);
  const closeModal = () => {
    setCalendar(false);
  };

  const formatDates = (startDate, endDate) => {
    return `${moment(startDate).add(10, 'days').calendar()} - ${moment(endDate)
      .add(10, 'days')
      .calendar()}`;
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {getIcon(icon)}
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={label}
        onChange={handleChange}
        value={
          !dateRage[0].endDate
            ? value
            : `${formatDates(dateRage[0].startDate, dateRage[0].endDate)}`
        }
        className={styles.inputButton}
        onClick={() => setDateRange(intitalDateRange)}
      />
      {calendar && (
        <div className={styles.dateRange}>
          <div className={styles.removeIcons}>
            <button className={styles.closeModel}>
              <X className={styles.closeicon} onClick={closeModal} />
            </button>
            <button
              onClick={() => setDateRange(intitalDateRange)}
              className={styles.clearButton}
            >
              Clear
            </button>
          </div>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRage}
          />
        </div>
      )}
    </div>
  );
};

export { DefaultInput, InputCalendar };
