import Link from 'next/link';
import Button from '../button/Button';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.container}>
      <Link href='/'>
        <a>
          <img src='/logo.png' alt='Holidaze logo' className={styles.logo} />
        </a>
      </Link>
      <nav className={styles.nav}>
        <button
          aria-expanded='false'
          aria-label='Menu'
          className={styles.hamburgerWrapper}
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>

        <ul className={styles.items}>
          <li className={styles.item}>
            <Link href='/'>
              <a className={styles.itemLink}>Home</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href='/hotels'>
              <a className={styles.itemLink}>Hotels</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href='/about'>
              <a className={styles.itemLink}>About</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href='/contact'>
              <a className={styles.itemLink}>Contact</a>
            </Link>
          </li>
          <li className={styles.itemButton}>
            <Button color='orange'>Login</Button>
          </li>
          <li className={styles.itemButton}>
            <Button color='grey'>Dashboard</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
