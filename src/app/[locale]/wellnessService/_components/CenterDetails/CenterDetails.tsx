"use client";

import React, { useState } from "react";
import "./CenterDetails.scss";
import Image from "next/image";
import Booking from "../Booking/Booking";
import Reviews from "../../../digitalContent/_components/Reviews/Reviews";
import Amenities from "../Amenities/Amenities";
import Location from "../Location/Location";
import RecentUpdateModal from "../RecentUpdateModal/RecentUpdateModal";
import VenueInsights from "../VenueInsights/VenueInsights";
import { useTranslations } from "next-intl";

const CenterDetails: React.FC = () => {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [upadateShowModal, setUpadateShowModal] = useState(false);
  const [venueInsightsModal, setVenueInsightsModal] = useState(false);

  const servicesData = [
    {
      title: t('yoga'),
      icon: "/images/services/service1.svg",
      items: [
        {
          name: t("gentle_flow_yoga_class"),
          duration: "60 Minutes",
          price: "35.00 CHF",
        },
        {
          name: t("power_vinyasa_yoga_workshop"),
          duration: "60 Minutes",
          price: "35.00 CHF",
        },
        {
          name: t("restorative_yoga_and_meditation"),
          duration: "90 Minutes",
          price: "45.00 CHF",
        },
      ],
    },
    {
      title: t('spa'),
      icon: "/images/services/service2.svg",
      items: [
        {
          name: t("tranquil_relaxation_massage"),
          duration: "60 Minutes",
          price: "90.00 CHF",
        },
        {
          name: t("revitalizing_aromatherapy_facial"),
          duration: "75 Minutes",
          price: "110.00 CHF",
        },
      ],
    },
    {
      title: t('fitness'),
      icon: "/images/services/service3.svg",
      items: [
        {
          name: t("energizing_cardio_fitness_class"),
          duration: "45 Minutes",
          price: "30.00 CHF",
        },
        {
          name: t("strength_and_conditioning_bootcamp"),
          duration: "45 Minutes",
          price: "30.00 CHF",
        },
        {
          name: t("mindful_movement_yoga_fusion"),
          duration: "75 Minutes",
          price: "35.00 CHF",
        },
      ],
    },
  ];
  
  const handleModalOpen = () => {
    setUpadateShowModal(true); // Show the modal when the title is clicked
  };
  const handleModalClose = () => {
    setUpadateShowModal(false); // Hide the modal when the close button is clicked
  };
  const handleVenueInsightsOpen = () => {
    setVenueInsightsModal(true); // Show the venue insights modal
  };
  const handleVenueInsightsClose = () => {
    setVenueInsightsModal(false); // Hide the venue insights modal
  };
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
  };

  return (
    <React.Fragment>
    <div className="centerDetails">
      <div className="container">
        <div className="header">
          <div className="title">
            <h2>Harmony Haven Wellness Center</h2>
            <div className="info">
              <span className="rating">
                <Image priority width={12} height={12} src="/images/home/star.svg" alt="star" /> 8.5
              </span>
              <span className="minute">$$$$</span>
              <span className="minute">44 Minutes</span>
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
        <div className="row g-2">
          <div className="col-lg-8 mt-2">
            <div className="serviceBanner">
              <Image priority  src="/images/services/mainBanner.svg" width={100} height={100} alt="mainBanner" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row g-2">
              <div className="col-lg-12 mt-2">
                <div className="blurBlock">
                  <Image priority className="mainImg" src="/images/services/grid1.svg" width={100} height={100} alt="grid1" />
                </div>
              </div>
              <div className="col-lg-6 mt-2">
                <div className="blurBlock">
                  <Image priority className="mainImg" src="/images/services/grid2.svg" width={100} height={100} alt="grid2" />
                  <div className="storyContent">
                    <Image priority  src="/images/services/photos.svg" width={100} height={100} alt="photos" />
                    <p>{t('see-photos')}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-2">
                <div className="blurBlock">
                  <Image priority className="mainImg" src="/images/services/grid3.svg" width={100} height={100} alt="grid3" />
                  <div className="storyContent">
                    <Image priority  src="/images/services/story.svg" width={100} height={100} alt="story" />
                    <p>{t('featured-stories')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="aboutClass">
              <h3>{t('about-space')}</h3>
              <p>
                Welcome to Harmony Haven, where tranquility meets rejuvenation in the heart of Zurichs serene Seefeld district. Nestled in the midst of picturesque landscapes and overlooking the calming waters of Lake Zurich, our wellness center is a sanctuary dedicated to enhancing your overall well-being. At Harmony Haven, {isExpanded ? (
                  <>we... </>
                ) : "we believe in the power of balance. Welcome to Harmony Haven, where tranquility meets rejuvenation in the heart of Zurichs serene Seefeld district. Nestled in the midst of picturesque landscapes and overlooking the calming waters of Lake Zurich, our wellness center is a sanctuary dedicated to enhancing your overall well-being. "}
                <button className="read-more" onClick={toggleReadMore}>
                {isExpanded ? t('readMore') : t('readLess')}
                </button>
              </p>
              <div className="insights">
                <div className="info">
                  <div className="logo" onClick={handleModalOpen}>
                    <Image priority width={40} height={40} src="/images/services/Virta.svg" alt="merck" />
                  </div>
                  <div>
                    <p className="title">{t('hosted-by')} Vitra <Image priority width={14} height={14} src="/images/services/verify.svg" alt="verify" /></p>
                    <p className="since">{t('member-since')} 16 Aug, 2023</p>
                  </div>
                </div>
                <div className="followInsight">
                  <div className="buttons">
                    <button onClick={handleVenueInsightsOpen}>{t('venue-insights')}</button>
                    <button onClick={toggleDropdown}>{isDropdownOpen ? t('following') : t('follow')} <Image priority  src="/images/content/arrowDown.svg" width={8} height={4} alt='arrowDown' /></button>
                    {isDropdownOpen && (
                      <div className="dropdown">
                        <div className='dropdown-item'> <Image priority  src="/images/content/notifications.svg" width={32} height={32} alt='notifications' />{t('recieve-notification')}</div>
                        <div className='dropdown-item'> <Image priority  src="/images/content/block.svg" width={32} height={32} alt='block' />{t('without-notification')}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
            <div className="service">
              <h3>{t('services')}</h3>
              {servicesData.map((service, index) => (
                <div key={index}>
                  <h3>
                    <Image priority  src={service.icon} width={19} height={19} alt={service.title} /> {service.title}
                  </h3>
                  <ul>
                    {service.items.map((item, idx) => (
                      <li key={idx}>
                        <div className="info">
                          <p>{item.name}</p>
                          <span>{item.duration}</span>
                        </div>
                        <div className="time">
                          <p>{item.price}</p>
                          <span>{t('per-session')}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Amenities />
            <Location />
            <Reviews />
          </div>
          <div className="col-lg-4">
            <Booking />
          </div>
        </div>
      </div>
    </div>
    <RecentUpdateModal showModal={upadateShowModal} onClose={handleModalClose} />
    <VenueInsights showModal={venueInsightsModal} onClose={handleVenueInsightsClose} />

    </React.Fragment>
  );
};

export default CenterDetails;
