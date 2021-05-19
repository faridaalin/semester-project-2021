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
  const [
    content,
    setContent,
    showMessages,
    setShowMessages,
    showEnq,
    setShowEnq,
    logout,
  ] = useDashboardContext();
  const { messages, enquiries } = data;
  const [openNav, setOpenNav] = useState(false);
  const [widthOnResize, resized] = useWindowWidth();
  const [navTitle, setNavTitle] = useState(showMessages ? true : false);
  const [renderData, setRenderData] = useState(
    showMessages ? messages : enquiries
  );
  const [activeClass, setActiveClass] = useState(1);

  const breakpoint = 768;

  const handleNavToggle = () => {
    if (getWindowWidth() > breakpoint) {
      return setOpenNav(() => true);
    }
    setOpenNav(() => !openNav);
  };

  const handleToggle = () => {
    setNavTitle(!navTitle);
    setRenderData(navTitle ? enquiries : messages);
    setActiveClass(1);
    setShowMessages(!showMessages);

    if (getWindowWidth() > breakpoint) {
      setOpenNav(() => true);
    } else {
      setOpenNav(() => false);
    }
  };

  const handleNavItem = (e) => {
    if (getWindowWidth() < breakpoint) {
      setOpenNav(() => false);
    } else {
      setOpenNav(() => true);
    }
    const id = e.target.id;
    setActiveClass(parseInt(id));
  };
  useEffect(() => {}, [showMessages]);

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
              {showMessages ? 'Messages' : 'Enquiries'}
            </button>

            {widthOnResize >= breakpoint || openNav ? (
              <nav className={`${styles.navContainer} `}>
                <ul className={styles.navItems}>
                  <li
                    className={`${styles.navItem} ${
                      activeClass === 1 ? styles.active : ''
                    }`}
                  >
                    <button
                      className={styles.navBtn}
                      id={1}
                      onClick={(e) => {
                        setRenderData(navTitle ? messages : enquiries);
                        handleNavItem(e);
                      }}
                    >
                      All{' '}
                      {showMessages
                        ? messages.data.length
                        : enquiries.data.length}
                    </button>
                  </li>
                  <li
                    className={`${styles.navItem} ${
                      activeClass === 2 ? styles.active : ''
                    }`}
                  >
                    <button
                      className={styles.navBtn}
                      id={2}
                      onClick={(e) => {
                        setRenderData('"Unread" is currently empty');
                        handleNavItem(e);
                      }}
                    >
                      Unread
                    </button>
                  </li>
                  <li
                    className={`${styles.navItem} ${
                      activeClass === 3 ? styles.active : ''
                    }`}
                  >
                    <button
                      className={styles.navBtn}
                      id={3}
                      onClick={(e) => {
                        setRenderData('"Sent" is currently empty.');
                        handleNavItem(e);
                      }}
                    >
                      Sent
                    </button>
                  </li>
                  <li
                    className={`${styles.navItem} ${
                      activeClass === 4 ? styles.active : ''
                    }`}
                  >
                    <button
                      className={styles.navBtn}
                      id={4}
                      onClick={(e) => {
                        setRenderData('"Trash" is currently empty');
                        handleNavItem(e);
                      }}
                    >
                      Trash
                    </button>
                  </li>
                </ul>

                <ul className={`${styles.navItems} ${styles.secondaryNav}`}>
                  <li className={styles.navItem}>
                    <button className={styles.navBtn} onClick={handleToggle}>
                      {showMessages ? 'Enquiries' : 'Messages'}
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
          {showMessages ? (
            <Accordion
              type='messages'
              content={showMessages ? messages : enquiries}
            />
          ) : (
            <Accordion
              type='enquiries'
              content={showMessages ? messages : enquiries}
            />
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
