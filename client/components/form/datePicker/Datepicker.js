import { useState } from 'react';
import styles from './datePicker.module.css';

const Datepicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return <div className={styles.container}></div>;
};

export default Datepicker;
