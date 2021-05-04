import { useState } from 'react';
import { MapPin, Calendar, Users, X } from 'react-feather';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import styles from './reservationForm.module.css';

const intitalDateRange = [
  {
    startDate: new Date(),
    endDate: null,
    key: 'selection',
  },
];

const ReservationForm = () => {
  const [showGuests, setShowGuests] = useState(true);
  const [guests, setGuests] = useState(null);
  const [calendar, setCalendar] = useState(false);
  const [dateRage, setDateRange] = useState(intitalDateRange);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const closeModal = () => {
    setCalendar(false);
  };

  const formatDates = (startDate, endDate) => {
    return `${moment(startDate).add(10, 'days').calendar()} - ${moment(endDate)
      .add(10, 'days')
      .calendar()}`;
  };
  return (
    <form className={styles.form}>
      <div className={styles.column}>
        <div className={styles.inputContainer}>
          <label htmlFor='Hotel' className={styles.label}>
            <MapPin className={styles.icon} />
            Location
          </label>
          <input
            type='search'
            name='search'
            id='serach'
            placeholder='Where do you want to stay?'
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <div>
            <label htmlFor='dates' className={styles.label}>
              <Calendar className={styles.icon} />
              Check in
            </label>

            <input
              type='button'
              value={
                !dateRage[0].endDate
                  ? 'Add date'
                  : `${formatDates(dateRage[0].startDate, dateRage[0].endDate)}`
              }
              className={styles.inputButton}
              onClick={() => setCalendar(!calendar)}
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
          <div>
            <label htmlFor='dates' className={styles.label}>
              <Calendar className={styles.icon} />
              Check out
            </label>

            <input
              type='button'
              value={
                !dateRage[0].endDate
                  ? 'Add date'
                  : `${formatDates(dateRage[0].startDate, dateRage[0].endDate)}`
              }
              className={styles.inputButton}
              onClick={() => setCalendar(!calendar)}
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
        </div>
      </div>
    </form>
  );
};

export default ReservationForm;
