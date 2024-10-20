"use client";

import React from 'react';
import './Fundraiser.scss';

const Fundraiser: React.FC = () => {

    return (
        <div className="fundraiser">
           <div className="donate">
            <input type="text" placeholder='0' />
            <p>Karma Coins Amount</p>
            <span>340 Karma Coins Available</span>
            <div className="line"></div>
            <input type="text" placeholder='0' />
            <p>Equivalent in CHF</p>
            <span>50 Karma Coins = 1 CHF</span>
           </div>
            <button>Become Fundraiser</button>
        </div>
    );
};

export default Fundraiser;
