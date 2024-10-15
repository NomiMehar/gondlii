"use client";

import React from 'react';
import './DigitalContent.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

interface SlideData {
  title: string;
  imageSrc: string;
    rating: number;
    priceRange: string;
    minute: string;
}

const slideData: SlideData[] = [
    {
      title: 'Pilates Workshop',
      imageSrc: '/images/home/content1.svg',
      rating: 8.5,
      priceRange: '65 CHF',
      minute: '21 Minutes',
    },
    {
      title: 'Meditation Class',
      imageSrc: '/images/home/content2.svg',
      rating: 9.2,
      priceRange: '30 CHF',
      minute: '9 Minutes',
    },
    {
      title: 'Core Strength Workshop',
      imageSrc: '/images/home/content3.svg',
      rating: 8.4,
      priceRange: '25 CHF',
      minute: '10 Minutes',
    },
    {
      title: 'Meditation Class',
      imageSrc: '/images/home/content4.svg',
      rating: 8.4,
      priceRange: '45 CHF',
      minute: '11 Minutes',
    },
    {
        title: 'Pilates Workshop',
        imageSrc: '/images/home/content1.svg',
        rating: 8.5,
        priceRange: '65 CHF',
        minute: '20 Minutes',
      },
      {
        title: 'Meditation Class',
        imageSrc: '/images/home/content2.svg',
        rating: 9.2,
        priceRange: '25 CHF',
        minute: '21 Minutes',
      },
  ];
  
  

const DigitalContent: React.FC = () => {
  return (
    <div className="digitalContent">
      <div className="container">
        <div className="title">
          <h2>Explore Digital Content</h2>
        </div>
        <Swiper
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={4}
          spaceBetween={15}
          navigation={true}
          speed={500}
          modules={[Autoplay, Navigation]}
          className="digitalContentSwiper"
          breakpoints={{
            1400: { slidesPerView: 4, spaceBetween: 15 },
            1000: { slidesPerView: 4, spaceBetween: 15 },
            600: { slidesPerView: 3, spaceBetween: 15 },
            0: { slidesPerView: 1, spaceBetween: 10, centeredSlides: false },
          }}
        >
          {slideData.map((item, index) => (
        <SwiperSlide key={index} className="swiper-slide">
        <div className="image-wrapper">
          <div className='banner'>
          <Image width={100} height={100} className='main-img' src={item.imageSrc} alt={item.title} />
          <Image width={32} height={32} className='heart' src="/images/home/heart.svg" alt="heart" />
          </div>
          <div className="titleWrap">
          <h2 className="slide-title">{item.title}</h2>
          <span className='price'>{item.priceRange}</span>
          </div>
            <div className="info">
             <span className='rating'><Image width={12} height={12} src="/images/home/star.svg" alt="star" /> {item.rating}</span>
            <span className='minute'>{item.minute}</span>
            </div>
        </div>
      </SwiperSlide>      
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DigitalContent;
