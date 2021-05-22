import Link from 'next/link';
import { Facebook, Instagram, Mail } from 'react-feather';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.innerFooter}>
        <section>
          <h3 className={styles.logo}>
            <span className={styles.firstLetter}>H</span>
            <span className={styles.logoLetters}>olidaze</span>
          </h3>
          <div className={styles.contentContainer}>
            <p>Håkonsgaten 15</p>
            <p>Bergen, Norway 15</p>
            <div className={styles.socialMedia}>
              <Facebook />
              <Instagram />
              <Mail />
            </div>
          </div>
        </section>
        <section>
          <h3>About Holizade</h3>
          <div className={styles.contentContainer}>
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
          </div>
        </section>
        <section>
          <h3>Help</h3>
          <div className={styles.contentContainer}>
            <span>Our Policy</span>
            <span>Customer Service</span>
            <span>F&Q</span>
            <span>Payment Options</span>
          </div>
        </section>
      </div>

      <div className={styles.note}>
        <p>This website was created for educational purpose only</p>
      </div>
    </footer>
  );
};

export default Footer;
