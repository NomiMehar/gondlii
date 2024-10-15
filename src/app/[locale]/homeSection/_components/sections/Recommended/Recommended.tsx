"use client";

import React from 'react';
import './Recommended.scss';
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
    imageSrc: '/images/home/for1.svg',
    rating: 8.5,
    priceRange: '$$$',
    location: 'Seefeld',
    services: ['Spa', 'Yoga', 'Fitness', 'Detox'],
  },
  {
    title: 'Serenity Spa Retreat',
    imageSrc: '/images/home/for2.svg',
    rating: 9.2,
    priceRange: '$$$$',
    location: 'Enge',
    services: ['Massage', 'Meditation', 'Workshops'],
  },
  {
    title: 'Pure Pilates Oasis',
    imageSrc: '/images/home/for3.svg',
    rating: 8.4,
    priceRange: '$$$$',
    location: 'Altstetten',
    services: ['Pilates', 'Core Strength', 'Nutrition'],
  },
  {
    title: 'Renewal Fitness Hub',
    imageSrc: '/images/home/for4.svg',
    rating: 8.4,
    priceRange: '$$$$',
    location: 'Oerlikon',
    services: ['Fitness', 'Pilates', 'Yoga'],
  },
  {
    title: 'Mindful Movement Studio',
    imageSrc: '/images/home/for5.svg',
    rating: 9.5,
    priceRange: '$$$$',
    location: 'Seefeld',
    services: ['Yoga', 'Mindfulness', 'Stress Management'],
  },
  {
    title: 'Vitality Wellness Lounge',
    imageSrc: '/images/home/for6.svg',
    rating: 8.9,
    priceRange: '$$$$',
    location: 'Oerlikon',
    services: ['Fitness', 'Spa', 'Nutrition'],
  },
  {
    title: 'Tranquil Tranquility Spa',
    imageSrc: '/images/home/for7.svg',
    rating: 8.4,
    priceRange: '$$$$',
    location: 'Wipkingen',
    services: ['Spa', 'Aromatherapy', 'Relaxation'],
  },
  {
    title: 'Blissful Balance Holistic Center',
    imageSrc: '/images/home/for8.svg',
    rating: 9.1,
    priceRange: '$$$$',
    location: 'Enge',
    services: ['Energy Healing', 'Workshops'],
  },
  {
    title: 'Harmony Haven Wellness Center',
    imageSrc: '/images/home/booking1.svg',
    rating: 8.5,
    priceRange: '$$$',
    location: 'Seefeld',
    services: ['Spa', 'Yoga', 'Fitness', 'Detox'],
  },
  {
    title: 'Serenity Spa Retreat',
    imageSrc: '/images/home/booking2.svg',
    rating: 9.2,
    priceRange: '$$$$',
    location: 'Enge',
    services: ['Massage', 'Meditation', 'Workshops'],
  },
  {
    title: 'Pure Pilates Oasis',
    imageSrc: '/images/home/booking3.svg',
    rating: 8.4,
    priceRange: '$$$$',
    location: 'Altstetten',
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
    title: 'Mindful Movement Studio',
    imageSrc: '/images/home/deal1.svg',
    rating: 9.5,
    priceRange: '$$$$',
    location: 'Seefeld',
    services: ['Yoga', 'Mindfulness', 'Stress Management'],
  },
  {
    title: 'Vitality Wellness Lounge',
    imageSrc: '/images/home/deal2.svg',
    rating: 8.9,
    priceRange: '$$$$',
    location: 'Oerlikon',
    services: ['Fitness', 'Spa', 'Nutrition'],
  },
  {
    title: 'Tranquil Tranquility Spa',
    imageSrc: '/images/home/deal3.svg',
    rating: 8.4,
    priceRange: '$$$$',
    location: 'Wipkingen',
    services: ['Spa', 'Aromatherapy', 'Relaxation'],
  },
  {
    title: 'Blissful Balance Holistic Center',
    imageSrc: '/images/home/deal4.svg',
    rating: 9.1,
    priceRange: '$$$$',
    location: 'Enge',
    services: ['Energy Healing', 'Workshops'],
  }
];

  

const Recommended: React.FC = () => {
  return (
    <div className="recommended">
      <div className="container">
        <div className="title">
          <h2>Recommended For You</h2>
          <button><Image width={20} height={20} src="/images/home/filter.svg" alt="filter" /> Filter</button>
        </div>
       <div className="row">
       {slideData.map((item, index) => (
        <div key={index} className="col-lg-3 col-md-4 px-2 mb-4 md-mb-5">
        <div className="image-wrapper">
          <div className='banner'>
          <Image width={100} height={100} className='main-img' src={item.imageSrc} alt={item.title} />
          <Image width={32} height={32} className='heart' src="/images/home/heart.svg" alt="heart" />
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
        </div>
            ))}
       </div>
      </div>
    </div>
  );
};

export default Recommended;
