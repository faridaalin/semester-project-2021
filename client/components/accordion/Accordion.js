import { useState } from 'react';
import dateFormat from 'dateformat';
import { format } from 'date-fns';
import Button from '../../components/button/Button';
import styles from './accordion.module.css';

const Accordion = ({ type, content }) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  if (type === 'messages') {
    return (
      <div className={styles.accordionSection}>
        <div className={`${styles.accordion}`}>
          <span>From</span>
          <span>Subject</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        {typeof content === 'string' ? (
          <div>{content}</div>
        ) : (
          content?.data?.map((item, index) => (
            <div key={item._id}>
              <div
                className={`${styles.accordionHeader} ${
                  open === index ? styles.open : ''
                }`}
                onClick={() => toggleAccordion(index)}
                key={index}
              >
                <span>{item.firstname}</span>
                <span>{item.subject}</span>
                <span>{format(new Date(item.createdAt), 'LLL dd yyyy')}</span>
                <span>{item.isRead === false ? 'Unread' : 'Read'}</span>
              </div>
              {open === index ? (
                <div className={styles.accordionText}>
                  <p className={styles.paragraph}>{item.message}</p>
                  <div className={styles.btnContainer}>
                    <Button color='orange'>Reply</Button>
                  </div>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className={styles.accordionSection}>
      <div className={`${styles.accordion}`}>
        <span>Hotel</span>
        <span>Check in</span>
        <span>Check Out</span>
        <span>Status</span>
      </div>
      {typeof content === 'string' ? (
        <div>{content}</div>
      ) : (
        content?.data?.map((item, index) => (
          <div key={item._id}>
            <div
              className={`${styles.accordionHeader} ${
                open === index ? styles.open : ''
              }`}
              onClick={() => toggleAccordion(index)}
              key={index}
            >
              <span>{item.hotel_name}</span>
              <span>{format(new Date(item.check_in), 'LLL dd yyyy')}</span>
              <span>{format(new Date(item.check_out), 'LLL dd yyyy')}</span>
              <span>{item.isRead === false ? 'Unread' : 'Read'}</span>
            </div>
            {open === index ? (
              <div className={styles.accordionText}>
                <span className={styles.paragraph}>
                  Booking reservation for:{' '}
                </span>
                <span>
                  {item.firstname} {item.lastname}
                </span>
                <p className={styles.paragraph}>
                  Adults: <span>{item.adults}</span>
                </p>
                <p className={styles.paragraph}>
                  Children: <span>{item.children}</span>
                </p>
                <p className={styles.paragraph}>
                  Price: <span>{item.price} NOK</span>
                </p>
                <div>
                  <p className={styles.paragraph}>
                    Email: <span>{item.email}</span>
                  </p>
                  <p className={styles.paragraph}>
                    Special Requests: <span>{item.special_requests}</span>
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default Accordion;
