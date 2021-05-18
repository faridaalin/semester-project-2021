import Link from 'next/link';
import { ChevronRight } from 'react-feather';

import styles from './breadCrumps.module.css';

const BreadCrumps = ({ pathname }) => {
  const lastPath = (path) => {
    let modifiedPath;

    if (path.includes('/')) {
      modifiedPath = path.replace('/', '');

      const pathToUpperCase =
        modifiedPath.charAt(0).toUpperCase() + modifiedPath.slice(1);
      return (modifiedPath = pathToUpperCase);
    }

    return modifiedPath;
  };

  return (
    <div className={styles.linkContainer}>
      <Link href='/'>
        <a className={styles.link}>Home</a>
      </Link>
      <Link href='/'>
        <a className={`${styles.active} ${styles.linkActive}`}>
          <ChevronRight className={styles.icon} />
          {lastPath(pathname)}
        </a>
      </Link>
    </div>
  );
};

export default BreadCrumps;
