import { useRouter } from 'next/router';
import BreadCrumps from '../breadCrumps/BreadCrumps';
import styles from './pageHeader.module.css';

const PageHeader = ({ title }) => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <h1 className={styles.title}>
      <BreadCrumps />
      {title}
    </h1>
  );
};

export default PageHeader;
