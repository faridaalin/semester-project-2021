import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { Users, Calendar, X } from 'react-feather';
import Guests from '../guest/Guests';
import styles from '../input/input.module.css';

const DateRangeWrapper = ({
  calendarContainer,
  setShowGuests,
  showGuests,
  guestContainer,
  calendar,
  setCalendar,
}) => {
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

  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState(intitalDateRange);

  const closeModal = () => {
    setCalendar(false);
  };

  return (
    <div className={styles.datesGuestsWrapper}>
      <div>
        <label htmlFor='dates' className={styles.label}>
          <Calendar className={styles.icon} />
          Dates
        </label>

        <input
          name='dates'
          type='button'
          value={
            !dateRange[0].endDate
              ? 'Add dates'
              : `${format(
                  new Date(dateRange[0].startDate),
                  'LLL dd yyyy'
                )} - ${format(new Date(dateRange[0].endDate), 'LLL dd yyyy')}`
          }
          className={styles.inputButton}
          onClick={() => setCalendar(!calendar)}
        />

        {calendar && (
          <div className={styles.dateRange} ref={calendarContainer}>
            <div className={styles.removeIcons}>
              <div className={styles.closeModel}>
                <X className={styles.closeicon} onClick={closeModal} />
              </div>
              <button
                onClick={() => setDateRange(intitalDateRange)}
                className={styles.clearButton}
              >
                Clear
              </button>
            </div>
            <DateRange
              editableDateInputs={false}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              ranges={dateRange}
              scroll={{ monthWidth: 300 }}
            />
          </div>
        )}
      </div>
      <div>
        <label htmlFor='guests' className={styles.label}>
          <Users className={styles.icon} />
          Guests
        </label>
        <input
          name='guests'
          type='button'
          value={guests >= 1 ? guests : 1}
          className={styles.inputButton}
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

export default DateRangeWrapper;
