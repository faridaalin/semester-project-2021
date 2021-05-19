import Link from 'next/link';
import { ChevronRight } from 'react-feather';

import styles from './breadCrumps.module.css';

const BreadCrumps = ({ crump }) => {
  const lastPath = (path) => {
    let modifiedPath;

    if (path.includes('/')) {
      modifiedPath = path.replace('/', '');

      const pathToUpperCase =
        modifiedPath.charAt(0).toUpperCase() + modifiedPath.slice(1);
      return (modifiedPath = pathToUpperCase);
    }
    console.log('modifiedPath:', modifiedPath);

    return modifiedPath;
  };
  console.log('crump:', crump);

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
