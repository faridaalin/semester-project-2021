import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Button from '../button/Button';
import getWindowWidth from '@/helpers/getWindowWidth';
import Pill from '../pill/Pill';
import useOnScroll from '@/hooks/useOnScroll';
import useDashboardContext from '@/context/DashboardContext';
import { IS_ADMIN, COOKIE_VALUE, COOKIE_PUBLIC } from '../../contants';
import styles from './navbar.module.css';

const Navbar = ({ setLoginModal }) => {
  const [open, setOpen] = useState(false);
  const [scrollYTop, setScrollYTop] = useState(true);
  const [cookie] = useCookies([IS_ADMIN]);
  const scrollDir = useOnScroll();
  const router = useRouter();
  const [, , , , logout] = useDashboardContext();

  const handleScroll = () => {
    setScrollYTop(window.pageYOffset < 80);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const breakpoint = 768;
    const hidemenu = () => {
      if (getWindowWidth() > breakpoint && open) {
        setOpen(false);
      }
    };
    window.addEventListener('resize', hidemenu);
    return () => {
      window.removeEventListener('resize', hidemenu);
    };
  }, []);

  const userNavigation = () => {
    if (process.browser && cookie.isAdmin === COOKIE_VALUE) {
      return (
        <li>
          <Pill name='Dashboard' select={2} dashboard='true' />
        </li>
      );
    } else if (cookie.isAdmin === COOKIE_PUBLIC) {
      return (
        <li className={styles.itemButton}>
          <Button color='dark' clickHandler={logout}>
            Logout
          </Button>
        </li>
      );
    } else {
      return (
        <li className={styles.itemButton}>
          <Button color='orange' clickHandler={() => setLoginModal(true)}>
            Login
          </Button>
        </li>
      );
    }
  };

  return (
    <header
      className={`${styles.header} ${
        scrollYTop
          ? styles.transform
          : scrollDir === 'scrolling up'
          ? styles.addBackground
          : styles.removeBackground
      }`}
    >
      <div className={`${styles.container} ${open && styles.headerColor}`}>
        <div className={styles.blur}></div>
        <button
          aria-expanded={open}
          aria-label='Menu'
          className={styles.hamburgerButton}
          onClick={toggleMenu}
        >
          <div className={styles.hamburgerWrapper}>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
          </div>
          <span className={styles.menu}>Menu</span>
        </button>
        <Link href='/'>
          <a className={styles.logo}>
            <span className={styles.logoLetter}>H</span>
            <span className={styles.logoLetters}>olidaze</span>
          </a>
        </Link>

        <nav
          className={`${styles.nav}  ${open ? styles.show : ''}`}
          suppressHydrationWarning={true}
        >
          {process.browser && (
            <ul className={`${styles.items}`}>
              <li>
                <Link href='/'>
                  <a
                    className={`${styles.item} ${
                      router.pathname === '/' && styles.active
                    } `}
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/hotels'>
                  <a
                    className={`${styles.item} ${
                      router.pathname === '/hotels' && styles.active
                    } `}
                  >
                    Hotels
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/about'>
                  <a
                    className={`${styles.item} ${
                      router.pathname === '/about' && styles.active
                    } `}
                  >
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/contact'>
                  <a
                    className={`${styles.item} ${
                      router.pathname === '/contact' && styles.active
                    } `}
                  >
                    Contact
                  </a>
                </Link>
              </li>

              {userNavigation()}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
