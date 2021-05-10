import { useState, useRef } from 'react';
import dateFormat from 'dateformat';
import styles from './accordion.module.css';

const Accordion = ({ messages }) => {
  const [open, setOpen] = useState(false);

  const content = useRef(null);

  const toggleAccordion = (index) => {
    console.log('index:', index);
    console.log('Open Toggle:', open);
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  console.log('Open OUTSIDE', open);
  return (
    <div className={styles.accordionSection}>
      <dispatchEvent className={`${styles.accordion}`}>
        <span>From</span>
        <span>Subject</span>
        <span>Date</span>
        <span>Status</span>
      </dispatchEvent>

      {messages?.data?.map((message, index) => (
        <div className={styles.accordionContent} key={message._id}>
          <div
            className={`${styles.accordionHeader} ${
              open === index ? styles.open : ''
            }`}
            onClick={() => toggleAccordion(index)}
            key={index}
          >
            <span>{message.firstname}</span>
            <span>{message.subject}</span>
            <span>{dateFormat(`${message.createdAt}`, 'mm/dd/yyyy')}</span>
            <span>{message.isRead === false ? 'Unread' : 'Read'}</span>
          </div>
          {open === index ? (
            <div className={styles.accordionText} ref={content}>
              <p>{message.message}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
