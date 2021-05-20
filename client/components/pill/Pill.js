import { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useRouter } from 'next/router';
import useDashboardContext from '../../context/DashboardContext';

import styles from './pill.module.css';

const Pill = ({ name, select, hotels, setSorted, dashboard, mobile }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const [showMessages, setShowMessages, showEnq, setShowEnq, logout] =
    useDashboardContext();

  const handleContentToggle = () => {
    setShowEnq(() => !showEnq);
    setShowMessages(() => !showMessages);
    if (pathname === '/dashboard') {
      setShow(!show);
    } else {
      router.push('/dashboard');
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
              <button className={styles.button} onClick={handleContentToggle}>
                Messages
              </button>
              <button className={styles.button} onClick={handleContentToggle}>
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
