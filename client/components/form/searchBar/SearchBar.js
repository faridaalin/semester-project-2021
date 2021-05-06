import { DefaultInput, InputCalendar } from '../input/Input';
import Button from '../../button/Button';

import styles from '../search/search.module.css';
import customStyles from './searchBar.module.css';

const SearchBar = () => {
  return (
    <form className={`${styles.form} ${customStyles.customForm}`}>
      <DefaultInput
        type='search'
        name='search'
        placeholder='Where do toy want to stay?'
        label='Location'
        icon='pin'
        customContainer={customStyles.customContainer}
      />

      <div className={`${styles.column} ${customStyles.customColumn}`}>
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

      <div className={`${styles.column} ${customStyles.customColumn}`}>
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
        <Button btnType='search' customBtnClass={customStyles.customBtnClass}>
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
