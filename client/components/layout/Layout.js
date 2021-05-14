import { useState } from 'react';
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
              header='Your header'
              footer={
                <div>
                  <button>Delete</button>
                  <button onClick={() => setLoginModal(false)}>Cancel</button>
                </div>
              }
              isOpen={loginModal}
              closeButton='close'
              closeButtonPosition='bottom'
              onClose={() => {
                setLoginModal(false);
                return true;
              }}
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
