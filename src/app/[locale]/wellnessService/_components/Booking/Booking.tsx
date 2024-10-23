import React, { useState, useRef, useEffect } from 'react';
import './Booking.scss';
import Image from 'next/image';
import CustomDatePicker from './CustomDatePicker';

const servicesData = [
    {
        category: "Yoga",
        image: "/images/services/service1.svg",
        services: [
            { circle: "/images/services/circle.svg", name: "Gentle Flow Yoga Class" },
            { circle: "/images/services/circle.svg", name: "Power Vinyasa Yoga Workshop" },
            { circle: "/images/services/circle.svg", name: "Restorative Yoga and Meditation" },
        ],
    },
    {
        category: "Spa",
        image: "/images/services/service2.svg",
        services: [
            { circle: "/images/services/circle.svg", name: "Tranquil Relaxation Massage" },
            { circle: "/images/services/circle.svg", name: "Revitalizing Aromatherapy Facial" },
        ],
    },
    {
        category: "Fitness",
        image: "/images/services/service3.svg",
        services: [
            { circle: "/images/services/circle.svg", name: "Energizing Cardio Fitness Class" },
            { circle: "/images/services/circle.svg", name: "Strength and Conditioning Bootcamp" },
            { circle: "/images/services/circle.svg", name: "Mindful Movement Yoga Fusion" },
        ],
    },
];

const timeOptions = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
];

const Booking: React.FC = () => {
    const [bookingCount, setBookingCount] = useState(1);
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

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
                <p>Price Range</p>
            </div>
            <div className="selectService">
                <div className="booking">
                    <p>Booking For</p>
                    <div className="add">
                        <button onClick={handleDecrement}>-</button>
                        <p>{bookingCount}</p>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                </div>

                {/* Accordion for Service Selection */}
                <div className={`booking-accordion ${activeAccordion === 'service' ? 'active' : ''}`}>
                    <button className="accordion-btn" onClick={() => handleAccordionToggle('service')}>
                        {selectedService || "Service"}
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
                        {selectedDate || "Select Date"}
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
                        {selectedTime || "Select Start Time"}
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
            <button className='book'>Book</button>
        </div>
    );
};

export default Booking;
