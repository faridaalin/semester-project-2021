import { useState } from 'react';
import { ChevronDown } from 'react-feather';
import styles from './pill.module.css';
import { useRouter } from 'next/router';

const Pill = ({ name, select, hotels, setSorted, dashboard }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const sortHeightToLow = () => {
    const sortedHotels = hotels.slice().sort((a, b) => b - a);
    setSorted(sorted);
  };
  const sortLowToHeigh = () => {
    const sortedHotels = hotels.slice().sort((a, b) => b - a);
    setSorted(sorted);
  };
  const handleMessages = () => {
    console.log('Show Messages');
    router.push('/dashboard');
  };
  const handleEnquires = () => {
    console.log('Show Enquires');
    router.push('/dashboard');
  };
  const HandleEnquireForm = () => {
    console.log('Show ADD Product form');
    router.push('/product');
  };
  const handleLogout = () => {
    console.log('User is logged out');
  };
  console.log('dashboard', dashboard);
  if (select < 2) {
    return <button className={`${styles.primaryButton}`}>{name}</button>;
  }
  return (
    <div className={styles.container}>
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
              <button className={styles.button} onClick={handleLogout}>
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
