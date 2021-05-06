import React from 'react';
import styles from '../input/input.module.css';
import textareaStyles from './textarea.module.css';

const Textera = ({ placeholder, label, name, customContainer }) => {
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
    </div>
  );
};

export default Textera;
