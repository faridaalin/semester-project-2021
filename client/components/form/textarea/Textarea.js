import { Field } from 'formik';
import styles from '../input/input.module.css';
import textareaStyles from './textarea.module.css';

const Textera = ({ placeholder, label, name, customContainer }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        console.log('Field', field);
        console.log('Meta', meta);
        return (
          <div className={`${styles.inputContainer} ${customContainer}`}>
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
            <textarea
              placeholder={placeholder}
              name={name}
              className={`${styles.textarea} ${textareaStyles.texteraInput}`}
              rows='4'
              cols='50'
            />
            {meta.touched && meta.error && (
              <div className={styles.error}>{meta.error}</div>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default Textera;
