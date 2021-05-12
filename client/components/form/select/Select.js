import { ChevronDown } from 'react-feather';
import { getIcon } from '../input/Input';
import styles from '../input/input.module.css';

const Select = ({
  name,
  options,
  label,
  icon,
  customContainer,
  handleChange,
}) => {
  return (
    <div className={`${styles.inputContainer} ${customContainer}`}>
      <label htmlFor={name} className={styles.label}>
        {getIcon(icon)}
        {label}
      </label>
      <select
        id={name}
        name={name}
        onChange={handleChange}
        className={`${styles.input} ${styles.select}`}
      >
        {options.map((room, i) => {
          return (
            <option value={room.price}>
              {room.room_type} {room.price} NOK
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
