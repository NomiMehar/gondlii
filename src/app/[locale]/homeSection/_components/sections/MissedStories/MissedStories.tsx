"use client";

import React, { useState, useRef,useEffect } from "react";
import "./MissedStories.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Loader from "../Loader/Loader";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import RecentUpdateModal from "@/app/[locale]/wellnessService/_components/RecentUpdateModal/RecentUpdateModal";


interface SlideData {
  title: string;
  imageSrc: string;
  icon: string;
  storyImages: string[];
}

const slideData: SlideData[] = [
  { title: 'Vitra', imageSrc: '/images/home/story5.svg', storyImages: ['/images/home/story1.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon1.svg' },
  { title: 'Spa & Harmony Heights', imageSrc: '/images/home/story2.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon2.svg' },
  { title: 'Spa Vitality Haven', imageSrc: '/images/home/story3.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon3.svg' },
  { title: 'Harmony Haven', imageSrc: '/images/home/story4.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon4.svg' },
  { title: 'Spapure Essence', imageSrc: '/images/home/story1.svg', storyImages: ['/images/home/story2.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon5.svg' },
  { title: 'Pilates Oasis', imageSrc: '/images/home/story2.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon6.svg' },
  { title: 'Vitra', imageSrc: '/images/home/story5.svg', storyImages: ['/images/home/story1.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon1.svg' },
  { title: 'Spa & Harmony Heights', imageSrc: '/images/home/story2.svg', storyImages: ['/images/home/story1.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon2.svg' },
  { title: 'Spa Vitality Haven', imageSrc: '/images/home/story3.svg', storyImages: ['/images/home/story5.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon3.svg' },
  { title: 'Harmony Haven', imageSrc: '/images/home/story4.svg', storyImages: ['/images/home/story3.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon4.svg' },
  { title: 'Spapure Essence', imageSrc: '/images/home/story1.svg', storyImages: ['/images/home/story3.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon5.svg' },
  { title: 'Pilates Oasis', imageSrc: '/images/home/story2.svg', storyImages: ['/images/home/story1.svg', '/images/home/story2.svg', '/images/home/story4.svg'], icon: '/images/home/storyIcon6.svg' },
];

const MissedStories: React.FC = () => {
  const t = useTranslations();
  const [currentImage, setCurrentImage] = useState<string[]>(slideData.map((item) => item.imageSrc));
  const [progress, setProgress] = useState<number[]>(slideData.map(() => 0));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imgIndices, setImgIndices] = useState<number[]>(slideData.map(() => 0));
  const [slideIntervalId, setSlideIntervalId] = useState<(ReturnType<typeof setInterval> | null)[]>(slideData.map(() => null));
  const [progressIntervalId, setProgressIntervalId] = useState<(ReturnType<typeof setInterval> | null)[]>(slideData.map(() => null));
  const [showPagination, setShowPagination] = useState<boolean[]>(slideData.map(() => false));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [upadateShowModal, setUpadateShowModal] = useState(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = slideData.map(item => {
        const img = new window.Image();
        return new Promise<void>((resolve) => {
          img.src = item.imageSrc;
          img.onload = () => resolve();
        });
      });

      Promise.all(imagePromises).then(() => {
        setIsLoading(false);
      });
    };

    preloadImages();
  }, []);

  const startSlideShow = (index: number) => {
    const images = slideData[index].storyImages;
    let imgIndex = 0;

    const intervalId = setInterval(() => {
      imgIndex = (imgIndex + 1) % images.length;

      setImgIndices((prevIndices) => {
        const updatedIndices = [...prevIndices];
        updatedIndices[index] = imgIndex;
        return updatedIndices;
      });

      setCurrentImage((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = images[imgIndex];
        return updatedImages;
      });
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const updatedProgress = [...prevProgress];
        updatedProgress[index] += 100 / (30 / images.length);
        if (updatedProgress[index] >= 100) updatedProgress[index] = 0;
        return updatedProgress;
      });
    }, 100);

    return { intervalId, progressInterval };
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setShowPagination((prev) => {
      const newPagination = [...prev];
      newPagination[index] = true;
      return newPagination;
    });
  
    // Reset image index and progress for the hovered slide
    setImgIndices((prevIndices) => {
      const updatedIndices = [...prevIndices];
      updatedIndices[index] = 0; // Start from the first image
      return updatedIndices;
    });
  
    setProgress((prevProgress) => {
      const updatedProgress = [...prevProgress];
      updatedProgress[index] = 0; // Reset progress
      return updatedProgress;
    });
  
    const { intervalId, progressInterval } = startSlideShow(index);
  
    setSlideIntervalId((prev) => {
      const newIntervals = [...prev];
      newIntervals[index] = intervalId;
      return newIntervals;
    });
  
    setProgressIntervalId((prev) => {
      const newIntervals = [...prev];
      newIntervals[index] = progressInterval;
      return newIntervals;
    });
  };
  

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    setShowPagination((prev) => {
      const newPagination = [...prev];
      newPagination[index] = false;
      return newPagination;
    });
  
    // Reset the current image to the original one when the mouse leaves
    setCurrentImage((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = slideData[index].imageSrc;
      return updatedImages;
    });
  
    // Reset the progress for the current slide
    setProgress((prevProgress) => {
      const updatedProgress = [...prevProgress];
      updatedProgress[index] = 0;
      return updatedProgress;
    });
  
    // Clear the intervals for the current slide
    if (slideIntervalId[index]) clearInterval(slideIntervalId[index]!);
    if (progressIntervalId[index]) clearInterval(progressIntervalId[index]!);
  
    // Check if swiperRef.current exists before calling stop()
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };
  
  

  const handleModalOpen = (item: SlideData) => {
    setUpadateShowModal(true);
  };

  const handleModalClose = () => {
    setUpadateShowModal(false);
  };

  return (
    <React.Fragment>
      <div className="missedStories">
        <div className="container">
          <div className="title">
            <h2>{t('missed-stories')}</h2>
          </div>

          {isLoading ? (
            <Loader className="missedLoader" />
          ) : (
            <Swiper
              loop={true}
              slidesPerView={6}
              spaceBetween={15}
              navigation={true}
              speed={500}
              modules={[Navigation]}
              className="swiper_container"
              onSwiper={(swiperInstance) => {
                swiperRef.current = swiperInstance;
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
                    onClick={() => handleModalOpen(item)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    {showPagination[index] && (
                      <div className="pagination-wrapper">

                        {slideData[index].storyImages.map((_, i) => (
                          <div key={i} className="progress-bar-wrapper">
                            <div
                              className={`pagination-dot ${
                                hoveredIndex === index && i === imgIndices[index] ? 'active pagination-dot-fill' : ''
                              }`}
                              style={{ width: i === imgIndices[index] ? `${progress[index]}` : '100%' }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    )}
                    <Image priority quality={100} width={100} height={100} className="main-img" src={currentImage[index]} alt={item.title} />
                    <div className="icon-title">
                      <Image priority quality={100} width={100} height={100} src={item.icon} alt={item.icon} />
                      <h2 className="slide-title">{item.title}</h2>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
        <RecentUpdateModal showModal={upadateShowModal} onClose={handleModalClose} />
    </React.Fragment>
  );
};

export default MissedStories;
