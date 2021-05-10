import { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import useDashboardContext from '../../context/DashboardContext';
import axios from '../../utils/axios';

import styles from './pill.module.css';

const Pill = ({ name, select, hotels, setSorted, dashboard }) => {
  const [show, setShow] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['isAdmin']);
  const router = useRouter();
  const { pathname } = router;

  const {
    showMessages,
    setShowMessages,
    showEnq,
    setShowEnq,
    logout,
  } = useDashboardContext();

  const sortHeightToLow = () => {
    const sortedHotels = hotels.slice().sort((a, b) => b - a);
    setSorted(sorted);
  };
  const sortLowToHeigh = () => {
    const sortedHotels = hotels.slice().sort((a, b) => b - a);
    setSorted(sorted);
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
    console.log('Show ADD Product form');
    if (pathname === '/product') {
      setShow(!show);
    } else {
      router.push('/product');
    }
  };
  // const handleLogout = async () => {
  //   console.log('User is logged out');
  //   try {
  //     const logOut = await axios.get('/users/logout');
  //     removeCookie('isAdmin', cookie, { path: '/', maxAge: 0, sameSite: true });
  //     localStorage.removeItem('userToken');
  //     router.push('/');
  //   } catch (err) {
  //     console.log('Log put ERROR', err);
  //   }
  // };

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
