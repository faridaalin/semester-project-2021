import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import axios from '../utils/axios';
import PageHeader from '../components/pageHeader/PageHeader';
import { parseCookies } from '../helpers/parseCookies';
import Accordion from '../components/accordion/Accordion';
import useDashboardContext from '../context/DashboardContext';
import styles from './dashboard.module.css';

export default function Dashboard({ data, admin }) {
  const [openNav, setOpenNav] = useState(false);
  const [widthOnLoad, setWidthOnLoad] = useState(null);

  const [customMessages, setCustomMessages] = useState(null);

  const { showMessages, setShowMessages, showEnq, setShowEnq, logout } =
    useDashboardContext();
  const breakpoint = 768;

  const { messages, enquiries } = data;

  const handleNavToggle = () => {
    if (widthOnLoad > breakpoint) {
      return setOpenNav(() => true);
    }
    setOpenNav(() => !openNav);
  };

  useEffect(() => {
    const handlePageLoad = () => {
      setWidthOnLoad(window.innerWidth);
    };
    window.addEventListener('load', handlePageLoad);
    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  useEffect(() => {
    setOpenNav(() => window.innerWidth > 768);
    setShowMessages(true);
  }, []);

  const handleMessages = () => {
    if (widthOnLoad > breakpoint) {
      setShowEnq(false);
      setShowMessages(true);
      setOpenNav(() => true);
    } else {
      setShowEnq(false);
      setShowMessages(true);
      setOpenNav(() => false);
    }
  };
  const handleEnquires = () => {
    if (widthOnLoad > breakpoint) {
      setOpenNav(() => true);
      setShowEnq(true);
      setShowMessages(false);
    } else {
      setShowEnq(true);
      setShowMessages(false);
      setOpenNav(() => false);
    }
  };

  return (
    <Layout>
      <PageHeader title='Dashboard' />

      <section className={styles.container}>
        {showMessages ? (
          <>
            <header
              className={`${styles.navigation} ${
                openNav ? styles.dark : styles.light
              }`}
            >
              <button className={styles.navButton} onClick={handleNavToggle}>
                Messages
              </button>

              {openNav && (
                <nav className={`${styles.navContainer} `}>
                  <ul className={styles.navItems}>
                    <li className={`${styles.navItem} ${styles.active}`}>
                      <button
                        className={styles.navBtn}
                        onClick={() => setCustomMessages(messages)}
                      >
                        All {messages.data.length}
                      </button>
                    </li>
                    <li className={styles.navItem}>
                      <button
                        className={styles.navBtn}
                        onClick={() => setCustomMessages('UNREAD')}
                      >
                        Unread
                      </button>
                    </li>
                    <li className={styles.navItem}>
                      <button
                        className={styles.navBtn}
                        onClick={() => setCustomMessages('SENT')}
                      >
                        Sent
                      </button>
                    </li>
                    <li className={styles.navItem}>
                      {' '}
                      <button
                        className={styles.navBtn}
                        onClick={() => setCustomMessages('TRASH')}
                      >
                        Trash
                      </button>
                    </li>
                  </ul>

                  <ul className={`${styles.navItems} ${styles.secondaryNav}`}>
                    <li className={styles.navItem} onClick={handleEnquires}>
                      Enquiries
                    </li>
                    <li className={styles.navItem} onClick={logout}>
                      Logout
                    </li>
                  </ul>
                </nav>
              )}
            </header>
            <Accordion
              content={messages}
              type='messages'
              customMessages={customMessages}
            />
          </>
        ) : showEnq ? (
          <>
            <header
              className={`${styles.navigation} ${
                openNav ? styles.dark : styles.light
              }`}
            >
              <button className={styles.navButton} onClick={handleNavToggle}>
                Enquiries
              </button>

              {openNav && (
                <nav className={`${styles.navContainer} `}>
                  <ul className={styles.navItems}>
                    <li className={`${styles.navItem} ${styles.active}`}>
                      All {enquiries.data.length}
                    </li>
                    <li className={styles.navItem}>
                      <button className={styles.navBtn}>Unread</button>
                    </li>
                    <li className={styles.navItem}>
                      <button className={styles.navBtn}>Sent</button>
                    </li>
                    <li className={styles.navItem}>
                      <button className={styles.navBtn}>Trash</button>
                    </li>
                  </ul>

                  <ul className={`${styles.navItems} ${styles.secondaryNav}`}>
                    <li className={styles.navItem} onClick={handleMessages}>
                      Messages
                    </li>
                    <li className={styles.navItem} onClick={logout}>
                      Logout
                    </li>
                  </ul>
                </nav>
              )}
            </header>
            <Accordion content={enquiries} type='enquiries' />
          </>
        ) : (
          'Welcome to your dashboard'
        )}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookie = parseCookies(context.req);
  const token = cookie.jwt;
  const admin = cookie.isAdmin;

  let data = null;
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const messages = axios.get('/messages', options);
    const enquiries = axios.get('/enquiries', options);

    const [messagesRes, enquiriesRes] = await Promise.all([
      messages,
      enquiries,
    ]);

    if (!messagesRes.data || !enquiriesRes.data) {
      return {
        notFound: true,
      };
    }

    data = {
      messages: messagesRes.data,
      enquiries: enquiriesRes.data,
    };
    console.log('MSG:', messagesRes.data);
    console.log('ENQ:', enquiriesRes.data);
  } catch (err) {
    console.error(err);

    if (err.response.status === 401) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  if (!data || !admin || !token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { data, admin },
  };
}
