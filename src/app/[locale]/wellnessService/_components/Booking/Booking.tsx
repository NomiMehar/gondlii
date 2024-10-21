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
            { circle: "/images/services/circle.svg", name: "Energizing Cardio Fitness Class" },
        ],
    },
];

const timeOptions = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
];

const Booking: React.FC = () => {
    const [bookingCount, setBookingCount] = useState(1);
    const [selectedService, setSelectedService] = useState("");
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [dateDropdownActive, setDateDropdownActive] = useState(false);
    const [timeDropdownActive, setTimeDropdownActive] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    // Refs for dropdowns
    const serviceDropdownRef = useRef<HTMLDivElement>(null);
    const dateDropdownRef = useRef<HTMLDivElement>(null);
    const timeDropdownRef = useRef<HTMLDivElement>(null);

    const handleIncrement = () => setBookingCount(prevCount => prevCount + 1);
    const handleDecrement = () => bookingCount > 1 && setBookingCount(prevCount => prevCount - 1);

    const toggleServiceDropdown = () => {
        setIsDropdownActive(prev => !prev);
        setDateDropdownActive(false); // Close date dropdown when service dropdown is toggled
        setTimeDropdownActive(false); // Close time dropdown when service dropdown is toggled
    };

    const toggleDateDropdown = () => {
        setDateDropdownActive(prev => !prev);
        setIsDropdownActive(false); // Close service dropdown when date dropdown is toggled
        setTimeDropdownActive(false); // Close time dropdown when date dropdown is toggled
    };

    const toggleTimeDropdown = () => {
        setTimeDropdownActive(prev => !prev);
        setIsDropdownActive(false); // Close service dropdown when time dropdown is toggled
        setDateDropdownActive(false); // Close date dropdown when time dropdown is toggled
    };

    const handleServiceSelect = (serviceName: string) => {
        setSelectedService(serviceName);
        setIsDropdownActive(false);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date.toLocaleDateString());
        setDateDropdownActive(false);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setTimeDropdownActive(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node) &&
            dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node) &&
            timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)
        ) {
            setIsDropdownActive(false);
            setDateDropdownActive(false);
            setTimeDropdownActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

                {/* Reusable Dropdown Component for Service */}
                <div ref={serviceDropdownRef} className={`booking-dropdown ${isDropdownActive ? 'active' : ''}`}>
                    <button className="dropdown-btn" onClick={toggleServiceDropdown}>
                        {selectedService || "Service"}
                        <Image src="/images/services/dropdown.svg" width={8} height={4} alt="dropdown" className="dropdown-icon" />
                    </button>

                    {isDropdownActive && (
                        <div className="dropdown-menu">
                            {servicesData.map((category, index) => (
                                <div key={index} className="booking-category">
                                    <h3>
                                        <Image src={category.image} width={20} height={20} alt={category.image} className="booking-image" />
                                        {category.category}
                                    </h3>
                                    {category.services.map((service, idx) => (
                                        <div key={idx} className="booking-item" onClick={() => handleServiceSelect(service.name)}>
                                            <p>
                                                <Image src={service.circle} width={20} height={20} alt={service.circle} />
                                                {service.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Use CustomDatePicker for date selection */}
                <div ref={dateDropdownRef} className={`booking-dropdown ${dateDropdownActive ? 'active' : ''}`}>
                    <button className="dropdown-btn" onClick={toggleDateDropdown}>
                        {selectedDate || "Select Date"}
                        <Image src="/images/services/dropdown.svg" width={8} height={4} alt="dropdown" className="dropdown-icon" />
                    </button>
                    {dateDropdownActive && (
                        <div className="dropdown-menu">
                            <CustomDatePicker onDateSelect={handleDateSelect} />
                        </div>
                    )}
                </div>

                {/* Start Time Dropdown */}
                <div ref={timeDropdownRef} className={`booking-dropdown ${timeDropdownActive ? 'active' : ''}`}>
                    <button className="dropdown-btn" onClick={toggleTimeDropdown}>
                        {selectedTime || "Select Start Time"}
                        <Image src="/images/services/dropdown.svg" width={8} height={4} alt="dropdown" className="dropdown-icon" />
                    </button>
                    {timeDropdownActive && (
                        <div className="dropdown-menu">
                            {timeOptions.map((time, index) => (
                                <div
                                    key={index}
                                    className="booking-time-item"
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    <Image src="/images/services/circle.svg" width={20} height={20} alt="circle" /> {time}
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
