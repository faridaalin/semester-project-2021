import Link from 'next/link';
import Image from 'next/image';
import Button from '../button/Button';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <button className={styles.hamburger} aria-expanded='false'>
          <span>Menu</span>
        </button>
        <ul className={styles.items}>
          <li>
            <Link href='/'>
              <a>
                <img
                  src='/logo.png'
                  alt='Holidaze logo'
                  className={styles.logo}
                />
              </a>
            </Link>
          </li>
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
          <li>
            <Button color='orange'>Login</Button>
          </li>
          <li className={styles.item}>
            <Button color='grey'>Dashboard</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
