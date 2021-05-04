import React from 'react';
import styles from './reservationForm.module.css';

const ReservationForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor='search' className={styles.label}>
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
    </form>
  );
};

export default ReservationForm;
