"use client";

import React, { useRef, useState } from 'react';
import './Content.scss';
import Image from 'next/image';
import Reviews from '../Reviews/Reviews';
import Checkout from '../Checkout/Checkout';

const Content: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Specify HTMLVideoElement type
  const [isPlaying, setIsPlaying] = useState(false); // State to track video playback
  const [isExpanded, setIsExpanded] = useState(true); // State to toggle Read More / Read Less
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown visibility

  const services = [
    { title: 'Introduction to Pilates', time: '10 Minutes' },
    { title: 'Core Strengthening Exercises', time: '15 Minutes' },
    { title: 'Flexibility and Mobility', time: '12 Minutes' },
    { title: 'Mindful Movement and Flow', time: '11 Minutes' },
  ];

  const handlePlayPauseVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset the video to the start
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
  };



  return (
    <div className="content">
      <div className="container">
        <div className="header">
          <div className="title">
            <h2>Pilates Workshop</h2>
            <div className="info">
              <span className='rating'>
                <Image priority width={12} height={12} src="/images/home/star.svg" alt="star" /> 9.2
              </span>
              <span className='minute'>44 Minutes</span>
            </div>
          </div>
          <div className="likeUpload">
            <button className="upload">
              <Image priority width={40} height={40} src="/images/content/upload.svg" alt="upload" />
            </button>
            <button className="like">
              <Image priority width={40} height={40} src="/images/content/like.svg" alt="like" />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="videoBanner">
              <video
                ref={videoRef}
                loop
                muted
                className={isPlaying ? 'video playing' : 'video paused'}
                poster='/images/content/videoBanner.svg'
                onClick={handlePlayPauseVideo}
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!isPlaying && (
                <div className="custom-play-button" onClick={handlePlayPauseVideo}>
                  <Image priority  src="/images/content/play.svg" width={60} height={60} alt="Play Button" className="play-icon" />
                </div>
              )}
            </div>
            <div className="aboutClass">
              <h3>About The Class</h3>
              <p>
                Join us at Harmony Haven Wellness Center for an immersive Pilates Workshop designed to enhance your mind-body connection and revitalize your spirit. Led by our experienced and certified Pilates instructors, this workshop offers a holistic approach to fitness, focusing on alignment, strength, and rejuvenation. {isExpanded ? (
                  <>During... </>
                ) : 'During this workshop, you\'ll delve into the fundamentals of Pilates. '}
              <button className="read-more" onClick={toggleReadMore}>
                {isExpanded ? 'Read More' : 'Read Less'}
              </button>
              </p>
              <div className="insights">
                <div className="info">
                <div className="logo">
                <Image priority width={40} height={40} src="/images/content/merck.svg" alt="merck" />
                </div>
                <div>
                    <p className='title'>Hosted By Merck</p>
                    <p className='since'>Member Since 02 Jan, 2024</p>
                </div>
                </div>
                <div className="followInsight">
                <div className="buttons">
                    <button>Venue Insights</button>
                    <button onClick={toggleDropdown}>{isDropdownOpen ? "Following" : "Follow"} <Image priority  src="/images/content/arrowDown.svg" width={8} height={4} alt='arrowDown' /></button>
                    {isDropdownOpen && (
                      <div className="dropdown">
                        <div className='dropdown-item'> <Image priority  src="/images/content/notifications.svg" width={32} height={32} alt='notifications' />Follow & Receive Notifications</div>
                        <div className='dropdown-item'> <Image priority  src="/images/content/block.svg" width={32} height={32} alt='block' />Follow Without Notifications</div>
                      </div>
                    )}
                </div>
                </div>
              </div>
            </div>
            <div className="service">
              <h3>Program Outline</h3>
              <h3><Image priority  src="/images/content/time.svg" width={19} height={19} alt="time" /> 48 Minutes</h3>
              <ul>
                {services.map((service, index) => (
                  <li key={index}>
                    <div className="info">
                      <p>{service.title}</p>
                    </div>
                    <div className="time">
                      <p>{service.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Reviews />
          </div>
          <div className="col-lg-4">
            <Checkout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
