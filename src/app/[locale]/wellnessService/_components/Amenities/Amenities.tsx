"use client";

import React from 'react';
import './Amenities.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Amenities: React.FC = () => {
    const t = useTranslations();
    return (
<div className="amenities">
    <h2>{t('amenities')}</h2>
    <div className="row">
        <div className="col-md-6">
            <div className="block">
                <Image priority src="/images/services/amenities1.svg" width={20} height={20} alt="amenities1" />
                <p>{t('free_parking')}</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="block">
                <Image priority src="/images/services/amenities2.svg" width={20} height={20} alt="amenities2" />
                <p>{t('wifi')}</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="block">
                <Image priority src="/images/services/amenities3.svg" width={20} height={20} alt="amenities3" />
                <p>{t('air_conditioned_spaces')}</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="block">
                <Image priority src="/images/services/amenities4.svg" width={20} height={20} alt="amenities4" />
                <p>{t('hydration_stations')}</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="block">
                <Image priority src="/images/services/amenities5.svg" width={20} height={20} alt="amenities5" />
                <p>{t('cozy_lounge')}</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="block">
                <Image priority src="/images/services/amenities6.svg" width={20} height={20} alt="amenities6" />
                <p>{t('indoor_bar')}</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="block">
                <Image priority src="/images/services/amenities7.svg" width={20} height={20} alt="amenities7" />
                <p>{t('pet_friendly_policy')}</p>
            </div>
        </div>   
    </div>
</div>

    );
};

export default Amenities;
