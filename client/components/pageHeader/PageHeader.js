import { useRouter } from 'next/router';
import BreadCrumps from '../breadCrumps/BreadCrumps';
import styles from './pageHeader.module.css';

const PageHeader = ({ title }) => {
  const router = useRouter();

  return (
    <h1 className={styles.title}>
      <BreadCrumps
        crump={{ label: title, path: router.asPath, pathname: router.pathname }}
      />
      {title}
    </h1>
  );
};

export default PageHeader;
