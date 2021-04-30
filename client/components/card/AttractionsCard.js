import Image from 'next/image';
import styles from './attractionsCard.module.css';

const AttractionsCard = (props) => {
  return (
    <div className='attractionsCard'>
      <div className={styles.image}>
        <Image
          src='/wharf.png'
          alt='Picture of the author'
          width={400}
          height={400}
        />
      </div>

      <h3 className={styles.H3}>Bryggen Hanseatic Wharf</h3>
      <p className={styles.P}>
        Bryggen is one of Bergen's and Norway's main attractions. Bryggen was
        built after the great fire in 1702 and is included on UNESCO's World
        Heritage List.
      </p>
      <p className={styles.P}>
        The very first buildings in Bergen were situated at Bryggen, which has
        been a vibrant and important area of the city for many centuries.
      </p>
    </div>
  );
};

export default AttractionsCard;
