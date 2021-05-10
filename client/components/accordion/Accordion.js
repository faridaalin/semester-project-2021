import { useState, useRef } from 'react';
import dateFormat from 'dateformat';
import styles from './accordion.module.css';

const Accordion = ({ messages }) => {
  const [open, setOpen] = useState('');
  const [height, setHeight] = useState('0px');
  const content = useRef(null);

  const toggleAccordion = () => {
    setOpen(open === '' ? 'open' : '');
    setHeight(open === 'open' ? '0px' : `${content.current.scrollHeight}px`);
    console.log(content.current.scrollHeight);
  };
  return (
    <div className={styles.accordionSection}>
      <dispatchEvent
        className={`${styles.accordion}`}
        onClick={toggleAccordion}
      >
        <span>From</span>
        <span>Subject</span>
        <span>Date</span>
        <span>Status</span>
      </dispatchEvent>

      {messages?.data?.map((message) => (
        <div className={styles.accordionContent} key={message._id}>
          <div
            className={`${styles.accordionHeader} ${open ? styles.open : ''}`}
            onClick={toggleAccordion}
          >
            <span>{message.firstname}</span>
            <span>{message.subject}</span>
            <span>{dateFormat(`${message.createdAt}`, 'mm/dd/yyyy')}</span>
            <span>{message.isRead === false ? 'Unread' : 'Read'}</span>
          </div>
          <div
            className={styles.accordionText}
            ref={content}
            style={{ maxHeight: `${setHeight}` }}
          >
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
