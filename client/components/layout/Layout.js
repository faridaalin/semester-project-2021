import styles from './layout.module.css';
import PageHeader from '../pageHeader/PageHeader';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <PageHeader title={title} />
        <section className={styles.mainInner}>{children}</section>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
