import { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
import styles from './datePicker.module.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const Datepicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dateFormat = 'YYYY/MM/DD';
  const monthFormat = 'YYYY/MM';
  return (
    <div className={styles.container}>
      {/* <RangePicker
        defaultValue={[
          moment('2015/01/01', dateFormat),
          moment('2015/01/01', dateFormat),
        ]}
        format={dateFormat}
      /> */}
      HEllo
    </div>
  );
};

export default Datepicker;
