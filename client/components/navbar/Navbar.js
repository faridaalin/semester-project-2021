import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '../../utils/axios';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Button from '../button/Button';
import getWindowWidth from '../../helpers/getWindowWidth';
import Pill from '../pill/Pill';
import useOnScroll from '../../hooks/useOnScroll';
import styles from './navbar.module.css';

const Navbar = ({ setLoginModal }) => {
  const [open, setOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['isAdmin']);
  const [scrollingBg, setScrollingBg] = useState(false);
  const scrollDir = useOnScroll();

  const router = useRouter();

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setScrollingBg(true);
    } else {
      setScrollingBg(false);
    }
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

  const handleLogout = async () => {
    try {
      await axios.get('/users/logout');
      removeCookie('isAdmin', cookie, { path: '/', maxAge: 0, sameSite: true });
      localStorage.removeItem('userToken');
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const userNavigation = () => {
    if (cookie.isAdmin === 'admin') {
      return (
        <li>
          <Pill name='Dashboard' select={2} dashboard='true' />
        </li>
      );
    } else if (cookie.isAdmin === 'public') {
      return (
        <li className={styles.itemButton}>
          <Button color='orange' clickHandler={handleLogout}>
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
        scrollDir === 'scrolling up'
          ? styles.removeBackground
          : styles.addBackground
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
              <li
                className={`${styles.item} ${
                  router.pathname === '/' && styles.active
                } `}
              >
                <Link href='/'>
                  <a href='/'>Home</a>
                </Link>
              </li>
              <li
                className={`${styles.item} ${
                  router.pathname === '/hotels' && styles.active
                } `}
              >
                <Link href='/hotels'>
                  <a href='/hotels'>Hotels</a>
                </Link>
              </li>
              <li
                className={`${styles.item} ${
                  router.pathname === '/about' && styles.active
                } `}
              >
                <Link href='/about'>
                  <a href='/about'>About</a>
                </Link>
              </li>
              <li
                className={`${styles.item} ${
                  router.pathname === '/contact' && styles.active
                } `}
              >
                <Link href='/contact'>
                  <a href='/contact'>Contact</a>
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
