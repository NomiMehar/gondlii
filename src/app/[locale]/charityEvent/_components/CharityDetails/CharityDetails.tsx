"use client";

import React, { useState } from 'react';
import './CharityDetails.scss';
import Image from 'next/image';
import Donators from '../Donators/Donators';
import Fundraiser from '../Fundraiser/Fundraiser';

const CharityDetails: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true); // State to toggle Read More / Read Less
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown visibility


  const toggleReadMore = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
  };

  return (
    <div className="charityDetails">
      <div className="container">
        <div className="header">
          <div className="title">
            <h2>Support Education in Underprivileged Communities</h2>
            <div className="info">
              <span className='minute'>100,000+ CHF Raised</span>
            </div>
          </div>
          <div className="likeUpload">
            <button className="upload">
              <Image width={40} height={40} src="/images/content/upload.svg" alt="upload" />
            </button>
            <button className="like">
              <Image width={40} height={40} src="/images/content/like.svg" alt="like" />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
           <div className="charityBanner">
            <Image src="/images/charity/charityBanner.svg" width={100} height={100} alt="charityBanner" />
           </div>
            <div className="aboutClass">
              <h3>Charity Details</h3>
              <p>
              Unlocking the boundless potential within every individual, our education and literacy programs stand as beacons of hope in underprivileged communities. With a steadfast commitment to empowerment, we believe that access to quality education is not just a privilege but a fundamental right. In the heart of {isExpanded ? (
                  <>disadvantaged... </>
                ) : 'disadvantaged neighborhoods, we sow the seeds of knowledge, nurturing minds hungry for learning. Through innovative teaching methodologies and tailored curriculums, we strive to ignite a passion for learning that transcends circumstances.'}
              <button className="read-more" onClick={toggleReadMore}>
                {isExpanded ? 'Read More' : 'Read Less'}
              </button>
              </p>
              <div className="insights">
                <div className="info">
                <div className="logo">
                <Image width={40} height={40} src="/images/charity/qual.svg" alt="merck" />
                </div>
                <div>
                    <p className='title'>Hosted By Give & Gain Initiative</p>
                    <p className='since'>Member Since 02 Jan, 2024</p>
                </div>
                </div>
                <div className="followInsight">
                <div className="buttons">
                    <button>Fundraiser Insights</button>
                    <button onClick={toggleDropdown}>{isDropdownOpen ? "Following" : "Follow"} <Image src="/images/content/arrowDown.svg" width={8} height={4} alt='arrowDown' /></button>
                    {isDropdownOpen && (
                      <div className="dropdown">
                        <div className='dropdown-item'> <Image src="/images/content/notifications.svg" width={32} height={32} alt='notifications' />Follow & Receive Notifications</div>
                        <div className='dropdown-item'> <Image src="/images/content/block.svg" width={32} height={32} alt='block' />Follow Without Notifications</div>
                      </div>
                    )}
                </div>
                </div>
              </div>
            </div>
            <Donators />
          </div>
          <div className="col-lg-4">
            <Fundraiser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityDetails;
