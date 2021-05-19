import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Navigation, Pagination]);

const SwiperSlider = ({ images, title }) => {
  return (
    <div
      styles={{
        width: 'calc(89vw - 2rem)',
        maxWidth: '450px',
        margin: '0 auto',
        borderRadius: '6px',
      }}
    >
      <Swiper
        id='main'
        tag='section'
        wrapperTag='ul'
        pagination={{ type: 'fraction' }}
        navigation={true}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
      >
        {images.map((img, i) => (
          <SwiperSlide tag='li' key={i}>
            <img src={img} alt={title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
