"use client";

import React from 'react';
import './PastBooking.scss';
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
    location: string;
    services: string[];
}

const slideData: SlideData[] = [
    {
      title: 'Harmony Haven Wellness Center',
      imageSrc: '/images/home/booking1.svg',
      rating: 8.5,
      priceRange: '$$$$',
      location: 'Seefeld',
      services: ['Spa', 'Yoga', 'Detox'],
    },
    {
      title: 'Serenity Spa Retreat',
      imageSrc: '/images/home/booking2.svg',
      rating: 9.2,
      priceRange: '$$$$',
      location: 'Engel',
      services: ['Massage', 'Meditation', 'Workshops'],
    },
    {
      title: 'Pure Pilates Oasis',
      imageSrc: '/images/home/booking3.svg',
      rating: 8.4,
      priceRange: '$$$$',
      location: 'Altdetten',
      services: ['Pilates', 'Core Strength', 'Nutrition'],
    },
    {
      title: 'Renewal Fitness Hub',
      imageSrc: '/images/home/booking4.svg',
      rating: 8.4,
      priceRange: '$$$$',
      location: 'Oerlikon',
      services: ['Fitness', 'Pilates', 'Yoga'],
    },
    {
        title: 'Harmony Haven Wellness Center',
        imageSrc: '/images/home/booking1.svg',
        rating: 8.5,
        priceRange: '$$$$',
        location: 'Seefeld',
        services: ['Spa', 'Yoga', 'Detox'],
      },
      {
        title: 'Serenity Spa Retreat',
        imageSrc: '/images/home/booking2.svg',
        rating: 9.2,
        priceRange: '$$$$',
        location: 'Engel',
        services: ['Massage', 'Meditation', 'Workshops'],
      },
  ];
  
  

const PastBooking: React.FC = () => {
  return (
    <div className="pastBooking">
      <div className="container">
        <div className="title">
          <h2>Based on Your Past Bookings</h2>
        </div>
        <Swiper
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={4}
          spaceBetween={15}
          navigation={true}
          speed={500}
          modules={[Autoplay, Navigation]}
          className="pastBookingSwiper"
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
          <div className="favorite">
            <Image width={32} height={32} src="/images/home/heat.svg" alt="heat" />
            <span>Users Favorite</span>
          </div>
          </div>
          <h2 className="slide-title">{item.title}</h2>
          <div className="additional-info">
          <div className="service">
                    {item.services.map((service, i) => (
                    <span key={i}>{service}</span>
                    ))}
            </div>
            <div className="info">
             <span className='rating'><Image width={12} height={12} src="/images/home/star.svg" alt="star" /> {item.rating}</span>
             <span className='price'>{item.priceRange}</span>
            <span className='location'>{item.location}</span>
            </div>
          </div>
        </div>
      </SwiperSlide>      
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PastBooking;
