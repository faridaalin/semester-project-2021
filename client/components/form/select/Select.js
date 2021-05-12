import { ChevronDown } from 'react-feather';
import { getIcon } from '../input/Input';
import styles from '../input/input.module.css';

const Select = ({ name, options, label, icon, customContainer }) => {
  return (
    <div className={`${styles.inputContainer} ${customContainer}`}>
      <label htmlFor={name} className={styles.label}>
        {getIcon(icon)}
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={`${styles.input} ${styles.select}`}
      >
        {options.map((room, i) => {
          return <option value={room.room_type}>{room.room_type}</option>;
        })}
      </select>
    </div>
  );
};

export default Select;
