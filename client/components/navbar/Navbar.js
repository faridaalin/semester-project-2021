import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronDown } from 'react-feather';

import Link from 'next/link';
import Button from '../button/Button';
import Login from '../form/login/Login';
import { isAdmin } from '../../helpers/parseCookies';
import getWindowWidth from '../../helpers/getWindowWidth';
import styles from './navbar.module.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const admin = isAdmin();

  const handleShow = () => setShow(true);
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

  console.log('USER COOKIE', admin);

  return (
    <header className={`${styles.container} ${open && styles.headerColor}`}>
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

      <nav className={`${styles.nav}  ${open ? styles.show : ''}`}>
        <ul className={`${styles.items}`}>
          <li
            className={`${styles.item} ${
              router.pathname === '/' && styles.active
            } `}
          >
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li
            className={`${styles.item} ${
              router.pathname === '/hotels' && styles.active
            } `}
          >
            <Link href='/hotels'>
              <a>Hotels</a>
            </Link>
          </li>
          <li
            className={`${styles.item} ${
              router.pathname === '/about' && styles.active
            } `}
          >
            <Link href='/about'>
              <a>About</a>
            </Link>
          </li>
          <li
            className={`${styles.item} ${
              router.pathname === '/contact' && styles.active
            } `}
          >
            <Link href='/contact'>
              <a>Contact</a>
            </Link>
          </li>

          {!admin ? (
            <li className={styles.itemButton}>
              {show && <Login show={show} setShow={setShow} />}
              <Button color='orange' clickHandler={handleShow}>
                Login
              </Button>
            </li>
          ) : (
            <li>
              <Button color='grey'>
                Dashboard <ChevronDown />
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
