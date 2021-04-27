import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.nav}>
      <Link href='/'>
        <a>
          <img src='/logo.png' alt='Holidaze logo' className={styles.logo} />
        </a>
      </Link>

      <nav>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/hotels'>
            <a>Hotels</a>
          </Link>
        </li>
        <li>
          <Link href='/about'>
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href='/contact'>
            <a>Contact</a>
          </Link>
        </li>
        <li>
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href='/dashboard'>
            <a>Dashboard</a>
          </Link>
        </li>
      </nav>
    </header>
  );
};

export default Navbar;
