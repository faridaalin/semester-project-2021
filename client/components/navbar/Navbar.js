import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../button/Button';
import styles from './navbar.module.css';
import getWindowWidth from '../utils/getWindowWidth';

const Navbar = (e) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(getWindowWidth());
  const breakpoint = 768;
  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => setWidth(getWindowWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`${styles.container} ${open && styles.headerColor}`}>
      <button
        aria-expanded={open}
        aria-label='Menu'
        className={styles.hamburgerButton}
        onClick={toggleMenu}
      >
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
      </button>
      <Link href='/'>
        <a className={styles.logo}>
          <span className={styles.logoLetter}>H</span>
          <span className={styles.logoLetters}>olidaze</span>
        </a>
      </Link>

      <nav className={`${styles.nav}  ${open && styles.show}`}>
        <ul className={`${styles.items}`}>
          <li className={styles.item}>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href='/hotels'>
              <a>Hotels</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href='/about'>
              <a>About</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href='/contact'>
              <a>Contact</a>
            </Link>
          </li>
          <li className={styles.itemButton}>
            <Button color='orange'>Login</Button>
          </li>
          <li>
            <Button color='grey'>Dashboard</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
