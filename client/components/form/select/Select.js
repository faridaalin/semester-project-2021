import { Field } from 'formik';
import { getIcon } from '../input/Input';
import styles from '../input/input.module.css';

const SelectField = ({
  name,
  options,
  label,
  icon,
  customContainer,
  formik,
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
        options={options}
        className={`${styles.input}`}
      >
        {options.map((room, i) => {
          return (
            <option value={room.room_type} key={i}>
              {room.room_type} {room.price} NOK
            </option>
          );
        })}
        {formik.touched.room_type && formik.errors.room_type && (
          <div className={styles.error}>{formik.errors.room_type}</div>
        )}
      </Field>
    </div>
  );
};

export default SelectField;
