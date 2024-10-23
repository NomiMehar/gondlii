"use client";

import React from 'react';
import './Amenities.scss';
import Image from 'next/image';

const Amenities: React.FC = () => {

    return (
        <div className="amenities">
            <h2>Amenities</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="block">
                    <Image priority  src="/images/services/amenities1.svg" width={20} height={20} alt="amenities1" />
                    <p>Free Parking</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="block">
                    <Image priority  src="/images/services/amenities2.svg" width={20} height={20} alt="amenities2" />
                    <p>Wifi</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="block">
                    <Image priority  src="/images/services/amenities3.svg" width={20} height={20} alt="amenities3" />
                    <p>Air-Conditioned Spaces</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="block">
                    <Image priority  src="/images/services/amenities4.svg" width={20} height={20} alt="amenities4" />
                    <p>Hydration Stations</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="block">
                    <Image priority  src="/images/services/amenities5.svg" width={20} height={20} alt="amenities5" />
                    <p>Cozy Lounge</p>
                    </div>
                 </div>
                <div className="col-md-6">
                    <div className="block">
                    <Image priority  src="/images/services/amenities6.svg" width={20} height={20} alt="amenities6" />
                    <p>Indoor Bar</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="block">
                    <Image priority  src="/images/services/amenities7.svg" width={20} height={20} alt="amenities7" />
                    <p>Pet-Friendly Policy</p>
                    </div>
                </div>   
            </div>
        </div>
    );
};

export default Amenities;
