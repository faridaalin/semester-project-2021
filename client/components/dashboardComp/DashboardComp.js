import { useEffect, useState } from 'react';
import { Menu } from 'react-feather';
import getWindowWidth from '../../helpers/getWindowWidth';
import Accordion from '../accordion/Accordion';
import useDashboardContext from '../../context/DashboardContext';

import styles from './dashboard.module.css';

const DashboardComp = ({ messages, enquiries }) => {
  const [showMessages, setShowMessages, showEnq, setShowEnq, logout] =
    useDashboardContext();
  const [openNav, setOpenNav] = useState(false);
  const [navTitle, setNavTitle] = useState(showMessages ? true : false);
  const [customData, setCusomData] = useState(null);
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
    setCusomData(navTitle ? enquiries : messages);
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
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpenNav(true);
      } else {
        setOpenNav(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setOpenNav]);

  useEffect(() => {
    setShowMessages(showMessages ? true : false);
    setShowEnq(showMessages ? false : true);

    if (window.innerWidth >= 768) {
      setOpenNav(true);
    } else {
      setOpenNav(false);
    }
  }, []);

  return (
    <section className={styles.container}>
      <header
        className={`${styles.navigation} ${
          openNav ? `${styles.dark} ${styles.absolute}` : styles.light
        }`}
      >
        <button className={styles.navButton} onClick={handleNavToggle}>
          <Menu />
          {showMessages ? 'Messages' : 'Enquiries'}
        </button>

        {openNav && (
          <nav
            className={`${styles.navContainer} ${openNav ? '' : styles.hide}`}
          >
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
                    setCusomData(navTitle ? messages : enquiries);
                    handleNavItem(e);
                  }}
                >
                  All{' '}
                  {showMessages ? messages.data.length : enquiries.data.length}
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
                    setCusomData('"Unread" is currently empty');
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
                    setCusomData('"Sent" is currently empty.');
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
                    setCusomData('"Trash" is currently empty');
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
        )}
      </header>
      {showMessages ? (
        <Accordion type='messages' content={messages} customData={customData} />
      ) : (
        <Accordion
          type='enquiries'
          content={enquiries}
          customData={customData}
        />
      )}
    </section>
  );
};

export default DashboardComp;
