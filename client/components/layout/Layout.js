import styles from './layout.module.css';
import PageHeader from '../pageHeader/PageHeader';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import BreadCrumps from '../breadCrumps/BreadCrumps';
import { useRouter } from 'next/router';

const Layout = ({ title, children }) => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <BreadCrumps path={path === '/' ? '' : path} />
        <PageHeader title={title} />
        <section>{children}</section>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
