import styles from './layout.module.css';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={`main ${styles.main}`}>
        <article>{children}</article>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
