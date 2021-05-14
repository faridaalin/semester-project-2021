import dateFormat from 'dateformat';
import { DefaultInput, InputCalendar } from '../input/Input';
import Button from '../../button/Button';

import styles from './searchBar.module.css';

const SearchBar = ({ content }) => {
  return (
    <form className={`${styles.form}`}>
      <DefaultInput
        type='search'
        name='search'
        placeholder='Where do toy want to stay?'
        label='Location'
        icon='pin'
        customContainer={styles.customContainer}
      />

      <div className={`${styles.column} `}>
        <InputCalendar
          type='button'
          name='date'
          value='Check in'
          label='Check in'
          icon='dates'
        />
        <InputCalendar
          type='button'
          name='date'
          value='Check out'
          label='Check out'
          icon='dates'
        />
      </div>

      <div className={`${styles.column} `}>
        <InputCalendar
          type='button'
          name='date'
          value='Add date'
          label='Adults'
          icon='users'
        />
        <InputCalendar
          type='button'
          name='date'
          value='Add date'
          label='Children'
          icon='users'
        />
      </div>
      <div className={styles.btnContainer}>
        <Button btnType='search' customBtnClass={styles.customBtnClass}>
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
