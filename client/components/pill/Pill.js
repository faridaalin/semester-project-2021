import { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import useDashboardContext from '../../context/DashboardContext';
import axios from '../../utils/axios';

import styles from './pill.module.css';

const Pill = ({ name, select, hotels, setSorted, dashboard, mobile }) => {
  const [show, setShow] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['isAdmin']);
  const router = useRouter();
  const { pathname } = router;

  const { showMessages, setShowMessages, setShowEnq, logout } =
    useDashboardContext();

  const sortHeightToLow = () => {
    const sortedHotels = hotels.slice().sort((a, b) => b - a);
    setSorted(sorted);
  };
  const sortLowToHeigh = () => {
    const sortedHotels = hotels.slice().sort((a, b) => b - a);
    setSorted(sorted);
  };

  const sortProducts = (order, type) => {
    if (type === 'price') {
      if (order === 'desc') {
        console.log('Heigh to low', type);

        const sortedHotels = hotels.sort((hotel) =>
          hotel.rooms.sort((a, b) => b.price - a.price)
        );
        console.log('sortedHotels', sortedHotels);
        // setSorted(sorted);
      } else {
        console.log('Low to heigh', type);
      }
    } else {
      if (type === 'rating') {
        if (order === 'desc') {
          console.log('Heigh to low', type);
        } else {
          console.log('Low to heigh', type);
        }
      }
    }
  };
  const handleMessages = () => {
    if (pathname === '/dashboard') {
      setShowMessages(true);
      setShowEnq(false);
      setShow(!show);
    } else {
      setShowMessages(true);
      setShowEnq(false);
      router.push('/dashboard');
    }
  };
  const handleEnquires = () => {
    if (pathname === '/dashboard') {
      setShow(!show);
      setShowEnq(true);
      setShowMessages(false);
    } else {
      router.push('/dashboard');
      setShowEnq(true);
      setShowMessages(false);
    }
  };
  const HandleEnquireForm = () => {
    if (pathname === '/create-product') {
      setShow(!show);
    } else {
      router.push('/create-product');
    }
  };

  if (select < 2) {
    return <button className={`${styles.primaryButton}`}>{name}</button>;
  }
  return (
    <div className={styles.container} suppressHydrationWarning={true}>
      <button
        className={`${styles.primaryButton}`}
        onClick={() => setShow(!show)}
      >
        {name} <ChevronDown className={styles.icon} />
      </button>
      {show && (
        <div className={styles.buttonContainer}>
          {dashboard ? (
            <>
              <button className={styles.button} onClick={handleMessages}>
                Messages
              </button>
              <button className={styles.button} onClick={handleEnquires}>
                Enquiries
              </button>
              <button className={styles.button} onClick={HandleEnquireForm}>
                Create Enquiries
              </button>
              <button className={styles.button} onClick={logout}>
                Logout
              </button>
            </>
          ) : mobile ? (
            <>
              <button
                className={styles.button}
                onClick={() => sortProducts('desc', 'price')}
              >
                Price hight to low
              </button>
              <button
                className={styles.button}
                onClick={() => sortProducts('asc', 'price')}
              >
                Price low to heigh
              </button>
              <button
                className={styles.button}
                onClick={() => sortProducts('desc', 'rating')}
              >
                Rating hight to low
              </button>
              <button
                className={styles.button}
                onClick={() => sortProducts('asc', 'rating')}
              >
                Rating low to heigh
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.button}
                onClick={() => console.log('Sort hotels heigh to low')}
              >
                {name}: Hight to low
              </button>
              <button
                className={styles.button}
                onClick={() => console.log('Sort hotels low to heigh')}
              >
                {name}: Low to heigh
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Pill;
