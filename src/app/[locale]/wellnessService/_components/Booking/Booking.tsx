import React, { useState, useRef, useEffect } from 'react';
import './Booking.scss';
import Image from 'next/image';
import CustomDatePicker from './CustomDatePicker';
import { useTranslations } from 'next-intl';


const Booking: React.FC = () => {
    const t = useTranslations();
    const [bookingCount, setBookingCount] = useState(1);
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const servicesData = [
        {
            category: t('yoga'),
          image: "/images/services/service1.svg",
          services: [
            {
              name: t("gentle_flow_yoga_class"),
              circle: "/images/services/circle.svg",
            },
            {
              name: t("power_vinyasa_yoga_workshop"),
              circle: "/images/services/circle.svg",
            },
            {
              name: t("restorative_yoga_and_meditation"),
              circle: "/images/services/circle.svg",
            },
          ],
        },
        {
            category: t('spa'),
          image: "/images/services/service2.svg",
          services: [
            {
              name: t("tranquil_relaxation_massage"),
              circle: "/images/services/circle.svg",
            },
            {
              name: t("revitalizing_aromatherapy_facial"),
              circle: "/images/services/circle.svg",
            },
          ],
        },
        {
            category: t('fitness'),
          image: "/images/services/service3.svg",
          services: [
            {
              name: t("energizing_cardio_fitness_class"),
              circle: "/images/services/circle.svg",
            },
            {
              name: t("strength_and_conditioning_bootcamp"),
              circle: "/images/services/circle.svg",
            },
            {
              name: t("mindful_movement_yoga_fusion"),
              circle: "/images/services/circle.svg",
            },
          ],
        },
      ];
    
    const timeOptions = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
    ];

    const handleIncrement = () => setBookingCount(prevCount => prevCount + 1);
    const handleDecrement = () => bookingCount > 1 && setBookingCount(prevCount => prevCount - 1);

    const handleAccordionToggle = (accordion: string) => {
        setActiveAccordion(prev => (prev === accordion ? null : accordion));
    };

    const handleServiceSelect = (serviceName: string) => {
        setSelectedService(serviceName);
        setActiveAccordion(null); // Close after selection
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date.toLocaleDateString());
        setActiveAccordion(null); // Close after selection
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setActiveAccordion(null); // Close after selection
    };

    return (
        <div className="booking">
            <div className="title">
                <h2>25 - 110 CHF</h2>
                <p>{t('price-range')}</p>
            </div>
            <div className="selectService">
                <div className="booking">
                    <p>{t('booking-for')}</p>
                    <div className="add">
                        <button onClick={handleDecrement}>-</button>
                        <p>{bookingCount}</p>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                </div>

                {/* Accordion for Service Selection */}
                <div className={`booking-accordion ${activeAccordion === 'service' ? 'active' : ''}`}>
                    <button className="accordion-btn" onClick={() => handleAccordionToggle('service')}>
                        {selectedService || t('services')}
                        <Image priority  src="/images/services/dropdown.svg" width={8} height={4} alt="dropdown" className="accordion-icon" />
                    </button>

                    {activeAccordion === 'service' && (
                        <div className="accordion-content">
                            {servicesData.map((category, index) => (
                                <div key={index} className="booking-category">
                                    <h3>
                                        <Image priority  src={category.image} width={20} height={20} alt={category.image} className="booking-image" />
                                        {category.category}
                                    </h3>
                                    {category.services.map((service, idx) => (
                                        <div key={idx} className="booking-item" onClick={() => handleServiceSelect(service.name)}>
                                            <p>
                                                <Image priority  src={service.circle} width={20} height={20} alt={service.circle} />
                                                {service.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Accordion for Date Selection */}
                <div className={`booking-accordion ${activeAccordion === 'date' ? 'active' : ''}`}>
                    <button className="accordion-btn" onClick={() => handleAccordionToggle('date')}>
                        {selectedDate || t('select-date')}
                        <Image priority  src="/images/services/dropdown.svg" width={8} height={4} alt="dropdown" className="accordion-icon" />
                    </button>

                    {activeAccordion === 'date' && (
                        <div className="accordion-content">
                            <CustomDatePicker onDateSelect={handleDateSelect} />
                        </div>
                    )}
                </div>

                {/* Accordion for Time Selection */}
                <div className={`booking-accordion ${activeAccordion === 'time' ? 'active' : ''}`}>
                    <button className="accordion-btn" onClick={() => handleAccordionToggle('time')}>
                        {selectedTime || t('select-time')}
                        <Image priority  src="/images/services/dropdown.svg" width={8} height={4} alt="dropdown" className="accordion-icon" />
                    </button>

                    {activeAccordion === 'time' && (
                        <div className="accordion-content">
                            {timeOptions.map((time, index) => (
                                <div
                                    key={index}
                                    className="booking-time-item"
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    <Image priority  src="/images/services/circle.svg" width={20} height={20} alt="circle" /> {time}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button className='book'>
                {t('book')}
            </button>
        </div>
    );
};

export default Booking;
