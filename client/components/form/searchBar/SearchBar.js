import { DefaultInput, InputCalendar } from '../input/Input';
import Button from '../../button/Button';

import styles from '../search/search.module.css';
// import styles from './searchBar.module.css';

const SearchBar = () => {
  return (
    <form className={styles.form}>
      <DefaultInput
        type='search'
        name='search'
        placeholder='Hotel name'
        label='Hotel'
        icon='pin'
      />

      <div className={styles.column}>
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

      <div className={styles.column}>
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
        <Button btnType='search'>Search</Button>
      </div>
    </form>
  );
};

export default SearchBar;
