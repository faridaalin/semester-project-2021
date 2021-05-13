import { useField } from 'formik';
import styles from '../input/input.module.css';
import textareaStyles from './textarea.module.css';

const Textera = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { placeholder, label, name } = props;
  return (
    <div className={`${styles.inputContainer} `}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        className={`${styles.textarea} ${textareaStyles.texteraInput}`}
        placeholder={placeholder}
        rows='4'
        cols='50'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Textera;
