"use client";

import React, { useState, useRef } from 'react';
import './MissedStories.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

interface SlideData {
  title: string;
  imageSrc: string;
  icon: string;
  storyImages: string[];
}

const slideData: SlideData[] = [
  { title: 'Vitra', imageSrc: '/images/home/story1.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon1.svg' },
  { title: 'Spa & Harmony Heights', imageSrc: '/images/home/story2.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon2.svg' },
  { title: 'Spa Vitality Haven', imageSrc: '/images/home/story3.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon3.svg' },
  { title: 'Harmony Haven', imageSrc: '/images/home/story4.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon4.svg' },
  { title: 'Spapure Essence', imageSrc: '/images/home/story5.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon5.svg' },
  { title: 'Pilates Oasis', imageSrc: '/images/home/story6.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon6.svg' },
  { title: 'Vitra', imageSrc: '/images/home/story1.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon1.svg' },
  { title: 'Spa & Harmony Heights', imageSrc: '/images/home/story2.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon2.svg' },
  { title: 'Spa Vitality Haven', imageSrc: '/images/home/story3.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon3.svg' },
  { title: 'Harmony Haven', imageSrc: '/images/home/story4.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon4.svg' },
  { title: 'Spapure Essence', imageSrc: '/images/home/story5.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon5.svg' },
  { title: 'Pilates Oasis', imageSrc: '/images/home/story6.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon6.svg' },
];

const MissedStories: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string[]>(slideData.map(item => item.imageSrc));
  const [progress, setProgress] = useState<number[]>(slideData.map(() => 0)); // Track progress
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track hovered slide index
  const [imgIndices, setImgIndices] = useState<number[]>(slideData.map(() => 0)); // Track imgIndex for each slide
  const [slideIntervalId, setSlideIntervalId] = useState<(ReturnType<typeof setInterval> | null)[]>(slideData.map(() => null));
  const [showPagination, setShowPagination] = useState<boolean[]>(slideData.map(() => false)); // Pagination visibility
  const swiperRef = useRef<any>(null); // Store the swiper instance

  const startSlideShow = (index: number) => {
    const images = slideData[index].storyImages;
    let imgIndex = 0;

    const intervalId = setInterval(() => {
      imgIndex = (imgIndex + 1) % images.length;

      setImgIndices(prevIndices => {
        const updatedIndices = [...prevIndices];
        updatedIndices[index] = imgIndex;
        return updatedIndices;
      });

      setCurrentImage(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[index] = images[imgIndex];
        return updatedImages;
      });
    }, 3000); // Adjust interval to match the image transition time

    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        const updatedProgress = [...prevProgress];
        updatedProgress[index] += 100 / (30 / images.length); // Dynamic progress speed based on image count
        if (updatedProgress[index] >= 100) updatedProgress[index] = 0;
        return updatedProgress;
      });
    }, 100); // Adjust the interval to ensure smooth progress

    return { intervalId, progressInterval };
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setShowPagination(prev => {
      const newPagination = [...prev];
      newPagination[index] = true;
      return newPagination;
    });

    const { intervalId } = startSlideShow(index);

    setSlideIntervalId(prev => {
      const newIntervals = [...prev];
      newIntervals[index] = intervalId;
      return newIntervals;
    });

    // Stop autoplay on hover
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    setShowPagination(prev => {
      const newPagination = [...prev];
      newPagination[index] = false;
      return newPagination;
    });

    setCurrentImage(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages[index] = slideData[index].imageSrc;
      return updatedImages;
    });

    setProgress(prevProgress => {
      const updatedProgress = [...prevProgress];
      updatedProgress[index] = 0;
      return updatedProgress;
    });

    clearInterval(slideIntervalId[index]!);

    // Restart autoplay when the mouse leaves
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <div className="missedStories">
      <div className="container">
        <div className="title">
          <h2>Stories You Missed</h2>
        </div>
        <Swiper
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={6}
          spaceBetween={15}
          navigation={true}
          speed={500}
          modules={[Autoplay, Navigation]}
          className="swiper_container"
          onSwiper={(swiperInstance) => {
            swiperRef.current = swiperInstance; // Store the swiper instance
            swiperInstance.autoplay.start();
          }}
          breakpoints={{
            1400: { slidesPerView: 6, spaceBetween: 15 },
            1000: { slidesPerView: 6, spaceBetween: 15 },
            600: { slidesPerView: 4, spaceBetween: 15 },
            0: { slidesPerView: 1, spaceBetween: 10 },
          }}
        >
          {slideData.map((item, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div
                className="image-wrapper"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {showPagination[index] && ( // Show pagination only on hover
                  <div className="pagination-wrapper">
                    {slideData[index].storyImages.map((_, i) => (
                      <div
                        key={i}
                        className={`pagination-dot ${hoveredIndex === index && i === imgIndices[index] ? 'active' : ''}`}
                        style={{ width: `${i === imgIndices[index] ? progress[index] : 100}%` }}
                      ></div>
                    ))}
                  </div>
                )}
                <Image width={100} height={100} className="main-img" src={currentImage[index]} alt={item.title} />
                <div className="icon-title">
                  <Image width={100} height={100} src={item.icon} alt={item.icon} />
                  <h2 className="slide-title">{item.title}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MissedStories;

