import { useRouter } from 'next/router';
import Image from 'next/image';
import { Star, Tv, Coffee, Wifi } from 'react-feather';
import Layout from '../../components/layout/Layout';
import axios from '../../utils/axios';
import showRating from '../../helpers/showRating';
import HeroHeaderHotels from '../../components/heroHeaderHotels/HeroHeaderHotels';
import SwiperSlider from '../../components/swiperSlider/SwiperSlider';
import SectionHeading from '../../components/sectionHeading/SectionHeading';
import Button from '../../components/button/Button';
import PageHeader from '../../components/pageHeader/PageHeader';

import styles from './hotelDetail.module.css';

const HotelDetail = (props) => {
  const router = useRouter();
  const hotel = props.data.data;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log('hotel', hotel);
  return (
    <Layout>
      <div className='fade'>
        <PageHeader title={hotel.title} />
        <section className={`section ${styles.container}`}>
          {/* <SwiperSlider images={hotel.images} title={hotel.title} /> */}
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
                  <img
                    src={img}
                    alt={hotel.title}
                    className={styles.imageGridItem}
                  />
                </div>
              ))}
            </div>
          </section>
          <div className={styles.content}>
            <div>
              <h3 className={styles.h3}>{hotel.subheading}</h3>
              <h4 className={styles.h4}>{hotel.address}</h4>
              <span>
                {showRating(hotel.rating).map((i) => (
                  <Star key={i} className={styles.rating} />
                ))}
              </span>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: hotel.description,
                }}
              ></div>
            </div>
            <div className={styles.rooms}>
              <p className={styles.roomsHeader}>Room Types</p>
              <p className={styles.night}>per night</p>
              <div className={styles.roomTypes}>
                {hotel.rooms.map((room) => (
                  <div className={styles.room}>
                    <span className={styles.type}>{room.room_type}</span>
                    <span className={styles.sleeps}>Sleeps {room.sleeps}</span>
                    <span className={styles.price}>{room.price} NOK</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.bottomContainer}>
              <div className={styles.includesContainer}>
                <div className={styles.includes}>
                  <Coffee className={styles.includesIcon} /> Breakfast
                </div>
                <div>
                  <Wifi className={styles.includesIcon} /> Wifi
                </div>
                <div>
                  <Tv className={styles.includesIcon} /> TV
                </div>
              </div>
              <Button btnType='search'>Reserve</Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HotelDetail;

export async function getStaticPaths() {
  let paths = [];
  try {
    const hotels = await axios.get(`/hotels`);
    const { data } = hotels.data;

    paths = data.map((hotel) => ({
      params: { id: hotel._id },
    }));
  } catch (err) {
    console.error(err);
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const hotels = await axios.get(`/hotels/${params.id}`);
    const data = hotels.data;

    return { props: { data } };
  } catch (err) {
    console.error(err);
  }
}
