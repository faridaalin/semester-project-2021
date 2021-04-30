import styles from './card.module.css';

const Card = ({ hotel }) => {
  console.log('HOTEL:', hotel);
  const truncate = (text, size) => {
    return text.length > size ? text.slice(0, size - 1) + ' ...' : text;
  };

  return (
    <a
      href='https://nextjs.org/docs'
      className={styles.card}
      style={{
        backgroundImage: `url(${hotel.main_image})`,
      }}
    >
      <div className={styles.content}>
        <span>{hotel.rating}</span>
        <h3 className={styles.h4}>{hotel.title}</h3>
        <h4 className={styles.h4}>{hotel.address}</h4>
        <div
          dangerouslySetInnerHTML={{ __html: truncate(hotel.description, 120) }}
        />
      </div>
    </a>
  );
};

export default Card;
