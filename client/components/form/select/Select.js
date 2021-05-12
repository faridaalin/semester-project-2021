import { ChevronDown } from 'react-feather';
import { Field } from 'formik';
import { getIcon } from '../input/Input';
import styles from '../input/input.module.css';

const SelectField = ({
  name,
  options,
  label,
  icon,
  customContainer,
  onChange,
}) => {
  return (
    <div className={`${styles.inputContainer} ${customContainer}`}>
      <label htmlFor={name} className={styles.label}>
        {getIcon(icon)}
        {label}
      </label>
      <Field
        as='select'
        id={name}
        name={name}
        handleChange={(item) => onChange(item)}
        options={options}
        className={`${styles.input} ${styles.select}`}
      >
        {options.map((room, i) => {
          return (
            <option value={room.room_type}>
              {room.room_type} {room.price} NOK
            </option>
          );
        })}
      </Field>
    </div>
  );
};

export default SelectField;
