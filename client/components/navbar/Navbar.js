import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../button/Button';
import styles from './navbar.module.css';
import getWindowWidth from '../utils/getWindowWidth';
import { ChevronDown } from 'react-feather';

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
  }, [open]);

  return (
    <header className={`${styles.container} ${open && styles.headerColor}`}>
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
            <Button color='grey'>
              Dashboard <ChevronDown />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
