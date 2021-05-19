import Link from 'next/link';
import { ChevronRight } from 'react-feather';

import styles from './breadCrumps.module.css';

const BreadCrumps = ({ crump }) => {
  return (
    <div className={styles.linkContainer}>
      <Link href='/'>
        <a className={styles.link}>Home</a>
      </Link>
      {crump.pathname === '/hotel/[id]' ? (
        <>
          <Link href='/hotels'>
            <a className={styles.link}>
              {' '}
              <ChevronRight className={styles.icon} /> Hotels
            </a>
          </Link>
          <span className={`${styles.active} ${styles.linkActive}`}>
            <ChevronRight className={styles.icon} /> {crump.label}
          </span>
        </>
      ) : (
        <>
          <span className={`${styles.active} ${styles.linkActive}`}>
            <ChevronRight className={styles.icon} /> {crump.label}
          </span>
        </>
      )}
    </div>
  );
};

export default BreadCrumps;
