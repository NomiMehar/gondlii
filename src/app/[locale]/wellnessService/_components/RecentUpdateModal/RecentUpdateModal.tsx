import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Image from 'next/image';
import './RecentUpdateModal.scss';
import { useTranslations } from "next-intl";

const images = [
    '/images/services/modalslide1.svg',
    '/images/services/mainBanner.svg',
    '/images/services/modalslide1.svg',
    '/images/services/mainBanner.svg'
];
const reviews = [
    {
        name: 'John S.',
        badge: '/images/content/badge1.svg',
        userImage: '/images/content/user1.svg',
        review: "This place looks like a dream! Need to book session ASAP 😍",
        date: '1h ago'
    },
    {
        name: 'Michael L.',
        badge: '/images/content/badge2.svg',
        userImage: '/images/content/user2.svg',
        review: "Seriously considering a trip to Zurich just to experience this!",
        date: '2h ago'
    },
    {
        name: 'Anthony M.',
        badge: '/images/content/badge3.svg',
        userImage: '/images/content/user3.svg',
        review: "Need some of that tranquility in my life right now. When's the next available appointment? 🙏",
        date: '3h ago'
    },
    {
        name: 'Vitra',
        badge: '/images/services/verify.svg',
        userImage: '/images/content/user4.svg',
        review: "Samantha L. You can check the available dates on Gondli, information is updated in real time 🙏",
        date: '4h ago'
    },
    {
        name: 'David R.',
        badge: '/images/content/badge2.svg',
        userImage: '/images/content/user5.svg',
        review: "Need some of that tranquility in my life right now. When's the next available appointment? 🙏",
        date: '5h ago'
    }
];
const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const t = useTranslations();

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        let progressInterval: string | number | NodeJS.Timeout | undefined;

        if (isPlaying) {
            // Slide change interval
            interval = setInterval(() => {
                handleNext();
            }, 15000); // Adjust time as needed (3 seconds per slide)

            // Progress bar interval
            progressInterval = setInterval(() => {
                setProgress((prev) => (prev + 2) % 110); // Update progress
            }, 300); // Adjust to sync with slide time
        }

        return () => {
            clearInterval(interval);
            clearInterval(progressInterval);
        };
    }, [isPlaying, currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setProgress(0); // Reset progress for new slide
    };

    const handleBack = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setProgress(0); // Reset progress for previous slide
    };

    const handlePause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleDotClick = (index: React.SetStateAction<number>) => {
        setCurrentIndex(index);
        setProgress(0);
        setIsPlaying(true);
    };

    return (
        <div className="carousel-container">
            {/* Image Display */}
            <div className="carousel-image">
                <Image priority quality={100} width={100} height={100} src={images[currentIndex]} alt={`Slide ${currentIndex}`} objectFit="cover" />
            </div>

            {/* Navigation Controls */}
            <div className="carousel-controls">
                <div className="carousel-position">
                    <button className="pause-btn" onClick={handlePause}>
                        <Image priority quality={100} src="/images/services/pause.svg" width={16} height={16} alt='pause' />
                        {isPlaying ? t('pause') : t('play')}
                    </button>
                    <div className="nextBack">
                    <button className="back-btn" onClick={handleBack}>
                        <Image priority quality={100} src="/images/services/previous.svg" width={24} height={24} alt='back' />
                    </button>
                    <button className="next-btn" onClick={handleNext}>
                        <Image priority quality={100} src="/images/services/next.svg" width={24} height={24} alt='next' />
                    </button>
                    </div>
                </div>
            </div>

            {/* Progress Bars */}
            <div className="carousel-dots">
                {images.map((_, index) => (
                    <div key={index} className="progress-bar-wrapper">
                        <div
                            className={`dot ${index === currentIndex ? 'active pagination-dot-fill' : ''}`}
                            onClick={() => handleDotClick(index)}
                            style={{ width: `${index === currentIndex ? progress : 110}%` }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface RecentUpdateModalProps {
    showModal: boolean;
    onClose: () => void; // Use onClose prop to handle modal close
}

const RecentUpdateModal: React.FC<RecentUpdateModalProps> = ({ showModal, onClose }) => {
    const t = useTranslations();
    return (
        <Modal show={showModal} onHide={onClose} centered size="lg" className="custom-modal">
            <Modal.Body className="modal-body-custom">
                <div className="booking-modal-content">
                    {/* Left: Carousel */}
                    <div className="booking-carousel">
                        <Carousel />
                    </div>

                    {/* Right: Booking Details */}
                    <div className="booking-details">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <div className="logo">
                                    <Image priority quality={100} width={40} height={40} src="/images/services/Virta.svg" alt="merck" />
                                    <h3>Vitra <Image priority quality={100} width={14} height={14} src="/images/services/verify.svg" alt="verify" /></h3>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <p className="description">
                            Step into serenity at Harmony Haven – Zurich’s ultimate wellness retreat in the heart of Seefeld. 🌿
                            Nestled by Lake Zurich, our sanctuary offers a tranquil escape from the everyday hustle.
                        </p>
                        {/* Comments Section */}
                        <div className="comments-section">
                            <h3>{t('comments')}</h3>
                            <div className="comments">
                            {reviews.map((review, index) => (
                                <div className="block" key={index}>
                                    <div className="user">
                                        <Image priority quality={100} width={40} height={40} src={review.userImage} alt="user" />
                                    </div>
                                    <div className="review-info">
                                        <h4>{review.name} <Image priority quality={100} width={26} height={26} src={review.badge} alt="user" /></h4>
                                        <p>{review.review}</p>
                                        <div className="info">
                                            <span className='rating'>
                                                <span>Reply</span>
                                            </span>
                                            <span className='minute'>{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Add Comment Section */}
                        <div className="add-comment">
                            <input type="text" placeholder={t('add-comment')} />
                            <Image priority quality={100}  src="/images/home/user.svg" width={28} height={28} alt='user' />
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default RecentUpdateModal;
