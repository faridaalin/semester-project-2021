import { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import Layout from '../components/layout/Layout';
import useAuthContext from '../context/AuthContext';
import axios from '../utils/axios';
import PageHeader from '../components/pageHeader/PageHeader';
import { parseCookies } from '../helpers/parseCookies';
import Accordion from '../components/accordion/Accordion';
import styles from './dashboard.module.css';

export default function Dashboard({ data }) {
  const [openNav, setOpenNav] = useState(false);
  const user = useAuthContext();
  const { messages, enquiries } = data;

  const handleNavToggle = () => {
    setOpenNav(() => !openNav);
  };

  console.log('navigation', openNav);
  console.log('openNav === open', openNav === 'open');

  return (
    <Layout>
      <PageHeader title='Dashboard' />
      <section className={styles.container}>
        <header
          className={`${styles.navigation} ${
            openNav ? styles.dark : styles.light
          }`}
        >
          <button className={styles.navButton} onClick={handleNavToggle}>
            Messages
          </button>
          <p
            className={`${styles.navItem} ${styles.active}  ${styles.current}`}
          >
            Current
          </p>

          {openNav && (
            <nav className={`${styles.navContainer} `}>
              <ul className={styles.navItems}>
                <li className={`${styles.navItem} ${styles.active}`}>
                  All {messages.data.length}
                </li>
                <li className={styles.navItem}>Unread</li>
                <li className={styles.navItem}>Sent</li>
                <li className={styles.navItem}>Trash</li>
              </ul>

              <ul className={`${styles.navItems} ${styles.secondaryNav}`}>
                <li className={styles.navItem}>Enquiries</li>
                <li className={styles.navItem}>Logout</li>
              </ul>
            </nav>
          )}
        </header>
        <Accordion messages={messages} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookie = parseCookies(context.req);
  const token = cookie.jwt;

  let data;
  try {
    const options = {
      headers: {
        cookie: token,
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
    console.log('messagesRes', messagesRes);

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

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { data },
  };
}
