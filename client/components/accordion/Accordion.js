import { useState } from 'react';

import { format } from 'date-fns';
import { useMounted } from '../../hooks/hasMounted';
import Pagination from '../../components/pagination/Pagination';
import Button from '../../components/button/Button';
import styles from './accordion.module.css';

const Accordion = ({ type, content, customData }) => {
  const { hasMounted } = useMounted();
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const data = typeof content === 'string' ? [] : content.data;
  const itemPerPage = 5;
  const visited = pageNumber * itemPerPage;

  const pageCount = Math.ceil(data.length / itemPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayItems = (data, open, type) => {
    let itemsToDisplay;
    if (type === 'messages') {
      itemsToDisplay =
        hasMounted && data && data.length > 0 ? (
          data.slice(visited, visited + itemPerPage).map((item, index) => {
            return (
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
            );
          })
        ) : (
          <div className={styles.accordionText}>
            <p className={styles.paragraph}>
              You don't have any messages at the moment.
            </p>
          </div>
        );

      return itemsToDisplay;
    } else {
      itemsToDisplay =
        hasMounted && data && data.length > 0 ? (
          data.slice(visited, visited + itemPerPage).map((item, index) => {
            return (
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
            );
          })
        ) : (
          <div className={styles.accordionText}>
            <p className={styles.paragraph}>
              You don't have any enquiries at the moment.
            </p>
          </div>
        );

      return itemsToDisplay;
    }
  };

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
        {typeof customData === 'string' ? (
          <div className={styles.accordionText}>
            <p className={styles.paragraph}>{customData}</p>
          </div>
        ) : (
          <>
            {displayItems(content.data, open, 'messages')}
            {content && content.data.length > 0 && (
              <Pagination pageCount={pageCount} changePage={changePage} />
            )}
          </>
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
      {typeof customData === 'string' ? (
        <div className={styles.accordionText}>
          <p className={styles.paragraph}>{customData}</p>
        </div>
      ) : (
        <>
          {displayItems(content.data, open, 'enquiries')}
          {content && content.data.length > 0 && (
            <Pagination pageCount={pageCount} changePage={changePage} />
          )}
        </>
      )}
    </div>
  );
};

export default Accordion;
