import styles from './layout.module.css';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <article>
          <div className={styles.subHeader}></div>
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
