import { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useRouter } from 'next/router';
import useDashboardContext from '@/context/DashboardContext';

import styles from './pill.module.css';

const Pill = ({ name, select, dashboard, mobile, setOpen }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const [, setShowMessages, , setShowEnq, logout] = useDashboardContext();

  const handleMessages = () => {
    setShowEnq(false);
    setShowMessages(true);
    if (pathname === '/dashboard') {
      setShow(!show);
      setOpen(false);
    } else {
      router.push('/dashboard');
    }
  };
  const handleEnquires = () => {
    setShowEnq(true);
    setShowMessages(false);

    if (pathname === '/dashboard') {
      setShow(!show);
      setOpen(false);
    } else {
      router.push('/dashboard');
    }
  };

  const HandleEnquireForm = () => {
    if (pathname === '/create-product') {
      setShow(!show);
      setOpen(false);
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
                Create Hotel
              </button>
              <button className={styles.button} onClick={logout}>
                Logout
              </button>
            </>
          ) : mobile ? (
            <>
              <button className={styles.button}>Price hight to low</button>
              <button className={styles.button}>Price low to heigh</button>
              <button className={styles.button}>Rating hight to low</button>
              <button className={styles.button}>Rating low to heigh</button>
            </>
          ) : (
            <>
              <button className={styles.button}>{name}: Hight to low</button>
              <button className={styles.button}>{name}: Low to heigh</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Pill;
