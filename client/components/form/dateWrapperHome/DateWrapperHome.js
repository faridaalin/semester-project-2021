import { useState, useEffect, useRef } from 'react';
import { parseISO, format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { Users, Calendar, X } from 'react-feather';
import Guests from '../guest/Guests';
import searchStylesHome from '../search/searchFormHome.module.css';
const DateWrapperHome = ({ calendarContainer, setShowGuests, showGuests }) => {
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
  const [calendar, setCalendar] = useState(false);
  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState(intitalDateRange);

  const closeModal = () => {
    setCalendar(false);
  };

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
              : `${format(
                  new Date(dateRange[0].startDate),
                  'LLL dd yyyy'
                )} - ${format(new Date(dateRange[0].endDate), 'LLL dd yyyy')}`
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
              editableDateInputs={false}
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

export default DateWrapperHome;
