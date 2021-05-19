import { useEffect, useState } from 'react';
import { Menu } from 'react-feather';
import Layout from '../components/layout/Layout';
import axios from '../utils/axios';
import useWindowWidth from '../hooks/useWindowSize';
import getWindowWidth from '../helpers/getWindowWidth';
import PageHeader from '../components/pageHeader/PageHeader';
import { parseCookies } from '../helpers/parseCookies';
import Accordion from '../components/accordion/Accordion';
import useDashboardContext from '../context/DashboardContext';
import styles from './dashboard.module.css';

export default function Dashboard({ data, admin, token }) {
  const { showMessages, setShowMessages, showEnq, setShowEnq, logout } =
    useDashboardContext();
  const { messages, enquiries } = data;
  const [openNav, setOpenNav] = useState(false);
  const [active, setActive] = useState(false);
  const [widthOnResize, resized] = useWindowWidth();
  const [navTitle, setNavTitle] = useState(showMessages ? true : false);
  const [customMessages, setCustomMessages] = useState(
    showMessages ? messages : enquiries
  );
  const [activeClass, setActiveClass] = useState(null);

  const breakpoint = 768;

  const handleNavToggle = () => {
    if (getWindowWidth() > breakpoint) {
      return setOpenNav(() => true);
    }
    setOpenNav(() => !openNav);
  };

  const handleToggle = () => {
    setNavTitle(!navTitle);
    setCustomMessages(navTitle ? enquiries : messages);

    if (getWindowWidth() > breakpoint) {
      setOpenNav(() => true);
    } else {
      setOpenNav(() => false);
    }
  };

  const handleNavItem = (e, index) => {
    if (getWindowWidth() < breakpoint) {
      setOpenNav(() => false);
    } else {
      setOpenNav(() => true);
    }
    console.log('e', e);
    setActiveClass(index);
  };

  const showMenu = () => {
    if (resized) {
      if (widthOnResize >= breakpoint) {
        setOpenNav(() => false);
      } else {
        setOpenNav(() => true);
      }
    } else {
      if (window.innerWidth < breakpoint) {
        setOpenNav(() => false);
      } else {
        setOpenNav(() => true);
      }
    }
  };

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
              <Menu />
              {navTitle ? 'Messages' : 'Enquiries'}
            </button>

            {widthOnResize >= breakpoint || openNav ? (
              <nav className={`${styles.navContainer} `}>
                <ul className={styles.navItems}>
                  <li className={`${styles.navItem} ${styles.active}`}>
                    <button
                      className={styles.navBtn}
                      id={1}
                      onClick={(e) => {
                        setCustomMessages(navTitle ? messages : enquiries);
                        handleNavItem(e, 1);
                      }}
                    >
                      All{' '}
                      {navTitle ? messages.data.length : enquiries.data.length}
                    </button>
                  </li>
                  <li className={styles.navItem}>
                    <button
                      className={styles.navBtn}
                      id={2}
                      onClick={(e) => {
                        setCustomMessages('"Unread" is currently empty');
                        handleNavItem(e, 2);
                      }}
                    >
                      Unread
                    </button>
                  </li>
                  <li className={styles.navItem}>
                    <button
                      className={styles.navBtn}
                      id={3}
                      onClick={(e) => {
                        setCustomMessages('"Sent" is currently empty.');
                        handleNavItem(e, 3);
                      }}
                    >
                      Sent
                    </button>
                  </li>
                  <li className={styles.navItem}>
                    <button
                      className={styles.navBtn}
                      id={4}
                      onClick={(e) => {
                        setCustomMessages('"Trash" is currently empty');
                        handleNavItem(e, 4);
                      }}
                    >
                      Trash
                    </button>
                  </li>
                </ul>

                <ul className={`${styles.navItems} ${styles.secondaryNav}`}>
                  <li className={styles.navItem}>
                    <button className={styles.navBtn} onClick={handleToggle}>
                      {navTitle ? 'Enquiries' : 'Messages'}
                    </button>
                  </li>
                  <li className={`${styles.navItem}`}>
                    <button className={styles.logoutButton} onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            ) : null}
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
    props: { data, admin, token },
  };
}
