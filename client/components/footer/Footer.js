import Link from 'next/link';
import { Facebook, Instagram, Mail } from 'react-feather';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section>
        <div className={styles.logo}>
          <span className={styles.logoLetter}>H</span>
          <span className={styles.logoLetters}>olidaze</span>
        </div>
        <p>Håkonsgaten 15</p>
        <p>Bergen, Norway 15</p>
        <div className={styles.socialMedia}>
          <Facebook />
          <Instagram />
          <Mail />
        </div>
      </section>
      <section>
        <h3>About Holizade</h3>
        <Link href='/'>
          <a>Home</a>
        </Link>
        <Link href='/about'>
          <a>About us</a>
        </Link>
        <Link href='/hotels'>
          <a>Our Accomodations</a>
        </Link>
        <Link href='/contact'>
          <a>Contact us</a>
        </Link>
      </section>
      <section>
        <h3>Help</h3>
        <Link href=''>
          <a>Our Policy</a>
        </Link>
        <Link href=''>
          <a>Customer Service</a>
        </Link>
        <Link href=''>
          <a>F&Q</a>
        </Link>
        <Link href=''>
          <a>Payment Options</a>
        </Link>
      </section>
      <section className={styles.note}>
        <p>This website was created for educational purpose only</p>
      </section>
    </footer>
  );
};

export default Footer;
