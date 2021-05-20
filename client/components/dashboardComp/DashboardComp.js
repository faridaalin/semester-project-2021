import { useEffect, useState } from 'react';
import { Menu } from 'react-feather';
import useWindowWidth from '../../hooks/useWindowSize';
import getWindowWidth from '../../helpers/getWindowWidth';
import Accordion from '../accordion/Accordion';
import { Media } from '../../context/Media';
import useDashboardContext from '../../context/DashboardContext';

import styles from './dashboard.module.css';

const DashboardComp = ({ messages, enquiries }) => {
  const [, , showMessages, setShowMessages, , , logout] = useDashboardContext();

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
  console.log('renderData', renderData);

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
        <Media greaterThan='sm'>
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
        </Media>
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
    </section>
  );
};

export default DashboardComp;
