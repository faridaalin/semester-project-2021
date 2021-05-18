import { useState } from 'react';
import { X } from 'react-feather';
import PureModal from 'react-pure-modal';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Login from '../form/login/Login';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  const [loginModal, setLoginModal] = useState(false);
  return (
    <div className={styles.container}>
      <Navbar setLoginModal={setLoginModal} />
      <main className={`main ${styles.main}`}>
        <article>
          {children}
          {loginModal && (
            <PureModal
              className={styles.loginModal}
              header={
                <span onClick={() => setLoginModal(false)}>
                  <X />
                </span>
              }
              isOpen={loginModal}
            >
              <Login setLoginModal={setLoginModal} />
            </PureModal>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
