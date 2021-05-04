import { useState } from 'react';
import { useRouter } from 'next/router';
import getWindowWidth from '../../helpers/getWindowWidth';
import { Star, Tv, Coffee, Wifi } from 'react-feather';
import Layout from '../../components/layout/Layout';
import axios from '../../utils/axios';
import showRating from '../../helpers/showRating';
import HeroHeaderHotels from '../../components/heroHeaderHotels/HeroHeaderHotels';
import SwiperSlider from '../../components/swiperSlider/SwiperSlider';
import DesktopSlides from '../../components/desktopSlides/DesktopSlides';
import Button from '../../components/button/Button';
import PageHeader from '../../components/pageHeader/PageHeader';
import useWindowWidth from '../../hooks/useWindowSize';
import ReservationForm from '../../components/form/reservationForm/ReservationForm';

import styles from './hotelDetail.module.css';

const HotelDetail = (props) => {
  const router = useRouter();
  const hotel = props.data.data;
  const [showForm, setShowForm] = useState(false);
  const [widthOnResize, resized] = useWindowWidth();
  const [widthOnLoad] = useState(getWindowWidth());

  const showImageGallery = () => {
    const breakpoint = 768;
    if (resized === true) {
      if (widthOnResize >= breakpoint) {
        return <DesktopSlides hotel={hotel} />;
      } else {
        return <SwiperSlider images={hotel.images} title={hotel.title} />;
      }
    }

    if (resized === false) {
      if (widthOnLoad >= breakpoint) {
        return <DesktopSlides hotel={hotel} />;
      } else {
        return <SwiperSlider images={hotel.images} title={hotel.title} />;
      }
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    console.log('SHOW/HIDE');
  };

  if (router.isFallback) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }
  console.log('showForm', showForm);

  return (
    <Layout>
      <HeroHeaderHotels />
      <PageHeader title={hotel.title} />
      <section className={`section ${styles.container}`}>
        {showImageGallery()}
        <div className={styles.flex}>
          <div>
            <h3 className={styles.h3}>{hotel.subheading}</h3>
            <h4 className={styles.h4}>{hotel.address}</h4>
          </div>
          <span>
            {showRating(hotel.rating).map((i) => (
              <Star key={i} className={styles.rating} />
            ))}
          </span>
        </div>
        <div className={styles.content}>
          <div>
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
                <div className={styles.room} key={room.room_type}>
                  <span className={styles.type}>{room.room_type}</span>
                  <span className={styles.sleeps}>Sleeps {room.sleeps}</span>
                  <span className={styles.price}>{room.price} NOK</span>
                </div>
              ))}
            </div>
          </div>

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
          {showForm && <ReservationForm />}
          <Button btnType='search' clickHandler={toggleForm}>
            Reserve
          </Button>
        </div>
      </section>
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
