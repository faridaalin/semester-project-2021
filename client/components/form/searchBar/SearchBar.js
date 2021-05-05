import { DefaultInput, InputCalendar } from '../input/Input';
import Button from '../../button/Button';

import styles from '../search/search.module.css';
import customStyles from './searchBar.module.css';

const SearchBar = () => {
  return (
    <form className={`${styles.form} ${customStyles.customForm}`}>
      <div className={customStyles.flex}>
        <DefaultInput
          type='search'
          name='search'
          placeholder='Hotel name'
          label='Hotel'
          icon='pin'
          customContainer={customStyles.customContainer}
        />

        <div className={`${styles.column} ${customStyles.dates}  `}>
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
      </div>
      <div className={customStyles.flex}>
        <div className={`${styles.column} ${customStyles.calendar}`}>
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
        <div className={customStyles.btnContainer}>
          <Button btnType='search' className={customStyles.customBtn}>
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
