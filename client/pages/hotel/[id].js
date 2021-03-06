import Head from 'next/head';
import { useState } from 'react';
import { Star, Tv, Coffee, Wifi } from 'react-feather';
import { useSearchContext } from '@/context/searchContext';
import Layout from '@/components/layout/Layout';
import axios from '@/utils/axios';
import showRating from '@/helpers/showRating';
import HeroHeaderHotels from '@/components/heroHeaderHotels/HeroHeaderHotels';
import SwiperSlider from '@/components/swiperSlider/SwiperSlider';
import DesktopSlides from '@/components/desktopSlides/DesktopSlides';
import Button from '@/components/button/Button';
import PageHeader from '@/components/pageHeader/PageHeader';
import useWindowWidth from '@/hooks/useWindowSize';
import ReservationForm from '@/components/form/reservationForm/ReservationForm';
import Alert from '@/components/alert/Alert';
import styles from './hotelDetail.module.css';

const HotelDetail = (props) => {
  if (props.data && props.data.status !== 'ok') {
    let status = {
      sent: false,
      msg: 'We have an error, please try again later',
    };
    return (
      <Layout>
        <section className='section'>
          <Alert status={status} />
        </section>
      </Layout>
    );
  }

  const hotel = props.data.data;
  const [modal, setModal] = useState(false);

  const handleShow = () => setModal(true);
  const innerWidth = () => {
    const isBrowser = typeof window !== 'undefined' ? window.innerWidth : null;
    return isBrowser;
  };
  const { search, setSearch } = useSearchContext();
  const [widthOnResize, resized] = useWindowWidth();
  const [widthOnLoad] = useState(innerWidth());

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

  return (
    <Layout>
      <Head>
        <title>{hotel.title} </title>
      </Head>
      <HeroHeaderHotels
        searchMatch={search}
        setSearchMatch={setSearch}
        detail
        hotel={hotel}
      />
      <PageHeader title={hotel.title} />
      <section className={`section ${styles.container}`}>
        {showImageGallery()}

        <div className={styles.content}>
          <div>
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
          <div className={styles.contentContainer}>
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
          </div>

          <div className={styles.reservation}>
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
            {modal && (
              <ReservationForm
                modal={modal}
                setModal={setModal}
                hotel={hotel}
              />
            )}
            <div className={styles.btnContainer}>
              <Button btnType='search' clickHandler={handleShow}>
                Reserve
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HotelDetail;

export async function getStatgeticPaths() {
  let paths = [];
  try {
    const hotels = await axios.get(`/hotels`);
    const { data } = hotels.data;

    paths = data.map((hotel) => ({
      params: { id: hotel._id },
    }));
    return { paths, fallback: true };
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data) {
      return {
        props: { data: err.response.data },
      };
    }
    return {
      props: { data: [] },
    };
  }
}

export async function getServerSideProps({ params }) {
  let data = {};
  try {
    const hotels = await axios.get(`/hotels/${params.id}`);
    data = hotels.data;

    return { props: { data } };
  } catch (err) {
    console.error(err);

    if (err.response && err.response.data) {
      return {
        props: { data: err.response.data },
      };
    }
    return {
      props: { data: data },
    };
  }
}
