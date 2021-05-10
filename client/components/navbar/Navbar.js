import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronDown } from 'react-feather';
import axios from '../../utils/axios';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Button from '../button/Button';
import Login from '../form/login/Login';
import getWindowWidth from '../../helpers/getWindowWidth';
import Pill from '../pill/Pill';
import styles from './navbar.module.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['isAdmin']);
  const admin = cookie.isAdmin === 'admin' ? true : false;
  console.log('cookie.isAdmin', cookie.isAdmin);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const router = useRouter();
  const handleShow = () => setShow(true);
  const toggleMenu = () => {
    setOpen(!open);
  };
  const clickHandler = () => {
    setDropDownMenu(!dropDownMenu);
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
    console.log('User is logged out');
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
    console.log('admin !== false', admin !== false);

    if (cookie.isAdmin === 'admin') {
      console.log('ADMIN', admin);
      return (
        <li>
          <Pill name='Dashboard' select={2} dashboard='true' />
        </li>
      );
    } else if (cookie.isAdmin === 'public') {
      console.log('Public', admin);
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
          {show && <Login show={show} setShow={setShow} />}
          <Button color='orange' clickHandler={handleShow}>
            Login
          </Button>
        </li>
      );
    }
  };

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

            {userNavigation()}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
