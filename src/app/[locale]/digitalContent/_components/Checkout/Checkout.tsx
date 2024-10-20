"use client";

import React, { useState } from 'react';
import './Checkout.scss';
import Link from 'next/link';

const Checkout: React.FC = () => {
    const [isOneTime, setIsOneTime] = useState(false); // State for One-time Payment checkbox
    const [isSubscription, setIsSubscription] = useState(false); // State for Subscription checkbox

    const handleOneTimeChange = () => {
        setIsOneTime(!isOneTime);
        setIsSubscription(false); // Uncheck Subscription if One-time is checked
    };

    const handleSubscriptionChange = () => {
        setIsSubscription(!isSubscription);
        setIsOneTime(false); // Uncheck One-time if Subscription is checked
    };

    return (
        <div className="checkout">
            <div className="title">
                <h2>65 CHF</h2>
                <p>One-time Payment</p>
            </div>
            <div className="subscription">
                <p>Activate <Link href="/">Subscription</Link> and have unlimited access to all the classes listed on Gondli</p>
            </div>
            <div className="paymentMethod">
                <p className='method'>Payment Method</p>
                <div className="checkboxes">
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={isOneTime}
                            onChange={handleOneTimeChange}
                        />
                        <span className="checkmark"></span>
                        One-time Payment
                    </label>
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={isSubscription}
                            onChange={handleSubscriptionChange}
                        />
                        <span className="checkmark"></span>
                        Gondli Subscription
                    </label>
                </div>
            </div>
            <button>Proceed to Checkout</button>
        </div>
    );
};

export default Checkout;
