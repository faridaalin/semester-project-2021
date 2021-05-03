import Link from 'next/link';
import { ChevronRight } from 'react-feather';

import styles from './breadCrumps.module.css';

const BreadCrumps = ({ path }) => {
  const lastPath = () => {
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
        <a className={styles.active}>
          <ChevronRight className={styles.icon} />
        </a>
      </Link>
    </div>
  );
};

export default BreadCrumps;
