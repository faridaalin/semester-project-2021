import Image from 'next/image';
import styles from './desktopSlides.module.css';

const DesktopSlides = ({ hotel }) => {
  return (
    <section className={styles.imageGallery}>
      <div className={styles.imageContainer}>
        <Image
          src={hotel.main_image}
          alt={hotel.title}
          layout='fill'
          objectFit='cover'
          className={styles.image}
        />
      </div>
      <div className={styles.imageGrid}>
        {hotel.images.map((img) => (
          <div className={styles.singleImg}>
            <img src={img} alt={hotel.title} className={styles.imageGridItem} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DesktopSlides;
