import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

const SwiperSlider = ({ images, title }) => {
  return (
    <section>
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
    </section>
  );
};

export default SwiperSlider;
