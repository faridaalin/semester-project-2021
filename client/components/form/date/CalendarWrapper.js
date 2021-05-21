import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import { getIcon } from '../input/Input';
import styles from '../input/input.module.css';

const CalendarWrapper = (props) => {
  const { label, selectedDate, setDateFunc, icon, name, placeholder } = props;
  const { setFieldValue, errors, handleBlur } = useFormikContext();
  const [field] = useField(props);

  return (
    <div className={`${styles.inputContainer}`}>
      <label htmlFor={name} className={styles.label}>
        {getIcon(icon)}
        {label}
      </label>

      <DatePicker
        {...field}
        onChange={(val) => {
          setDateFunc(val);
          setFieldValue(field.name, val);
        }}
        onBlur={handleBlur}
        selected={(field.value && new Date(field.value)) || null}
        startDate={selectedDate}
        className={`${styles.input} ${styles.datePicker}`}
        minDate={new Date()}
        name={name}
        placeholderText={placeholder}
        dateFormat='MMMM dd, yyyy'
      />

      {errors[name] && <div className={styles.error}>{errors[name]}</div>}
    </div>
  );
};

export default CalendarWrapper;
