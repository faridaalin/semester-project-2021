import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import axios from '../utils/axios';
import PageHeader from '../components/pageHeader/PageHeader';
import { parseCookies } from '../helpers/parseCookies';
import Accordion from '../components/accordion/Accordion';
import useDashboardContext from '../context/DashboardContext';
import styles from './dashboard.module.css';

export default function Dashboard({ data, admin }) {
  const { messages, enquiries } = data;
  const [openNav, setOpenNav] = useState(false);
  const [widthOnLoad, setWidthOnLoad] = useState(null);
  const [customMessages, setCustomMessages] = useState(messages);
  const [navTitle, setNavTitle] = useState(true);

  const { showMessages, setShowMessages, showEnq, setShowEnq, logout } =
    useDashboardContext();
  const breakpoint = 768;

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
    if (window.innerWidth > 768) {
      setOpenNav(() => true);
    }

    setShowMessages(true);
  }, [setOpenNav, setShowMessages]);

  const handleMessages = () => {
    setNavTitle(!navTitle);

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
    setNavTitle(!navTitle);
    console.log(widthOnLoad > breakpoint);
    setCustomMessages(navTitle ? enquiries : messages);

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

  const handleMenuOnNAvItem = () => {
    console.log('widthOnLoad', widthOnLoad);
    if (widthOnLoad < breakpoint) {
      setOpenNav(() => false);
    } else {
      setOpenNav(() => true);
    }
  };

  console.log('openNav', openNav);

  return (
    <Layout>
      <PageHeader title='Dashboard' />

      <section className={styles.container}>
        <>
          <header
            className={`${styles.navigation} ${
              openNav ? `${styles.dark} ${styles.absolute}` : styles.light
            }`}
          >
            <button className={styles.navButton} onClick={handleNavToggle}>
              {navTitle ? 'Messages' : 'Enquiries'}
            </button>

            {openNav && (
              <nav className={`${styles.navContainer} `}>
                <ul className={styles.navItems}>
                  <li className={`${styles.navItem} ${styles.active}`}>
                    <button
                      className={styles.navBtn}
                      onClick={() => {
                        setCustomMessages(navTitle ? messages : enquiries);
                        handleMenuOnNAvItem();
                      }}
                    >
                      All{' '}
                      {navTitle ? messages.data.length : enquiries.data.length}
                    </button>
                  </li>
                  <li className={styles.navItem}>
                    <button
                      className={styles.navBtn}
                      onClick={() => {
                        setCustomMessages('UNREAD');
                        handleMenuOnNAvItem();
                      }}
                    >
                      Unread
                    </button>
                  </li>
                  <li className={styles.navItem}>
                    <button
                      className={styles.navBtn}
                      onClick={() => {
                        setCustomMessages('SENT');
                        handleMenuOnNAvItem();
                      }}
                    >
                      Sent
                    </button>
                  </li>
                  <li className={styles.navItem}>
                    {' '}
                    <button
                      className={styles.navBtn}
                      onClick={() => {
                        setCustomMessages('TRASH');
                        handleMenuOnNAvItem();
                      }}
                    >
                      Trash
                    </button>
                  </li>
                </ul>

                <ul className={`${styles.navItems} ${styles.secondaryNav}`}>
                  <li className={styles.navItem} onClick={handleEnquires}>
                    {navTitle ? 'Enquiries' : 'Messages'}
                  </li>
                  <li className={styles.navItem} onClick={logout}>
                    Logout
                  </li>
                </ul>
              </nav>
            )}
          </header>
          {navTitle ? (
            <Accordion type='messages' content={customMessages} />
          ) : (
            <Accordion type='enquiries' content={customMessages} />
          )}
        </>
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
