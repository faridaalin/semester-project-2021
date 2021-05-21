import { useState } from 'react';
import dynamic from 'next/dynamic';
import { X } from 'react-feather';
import PureModal from 'react-pure-modal';
import Footer from '../footer/Footer';
import Login from '../form/login/Login';

const NavbarDynamic = dynamic(() => import('../navbar/Navbar'), { ssr: false });

import styles from './layout.module.css';

const Layout = ({ children }) => {
  const [loginModal, setLoginModal] = useState(false);
  return (
    <div className={styles.container}>
      <NavbarDynamic setLoginModal={setLoginModal} />
      <main className={`main ${styles.main}`}>
        <div>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
