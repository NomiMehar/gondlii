import React from 'react';
import './LocationServices.scss';
import Image from 'next/image';
const LocationServices: React.FC = () => {
  return (
    <React.Fragment>
      <div className="locationServices" style={{
        backgroundImage: `url('/images/home/locationServices.svg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '350px',
        padding: '60px 0'
      }}>
        <div className="container">
            <div className="content">
            <Image priority width={60} height={60} src="/images/home/LocationMarker.svg" alt="LocationMarker" />
                <h2>Turn on Location Services</h2>
                <p>Activate location services to discover the well-being you been always looking for - right next to your home.</p>
                <div className="buttons">
                    <button>Start Discovering Nearby</button>
                    <button>Not Now</button>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LocationServices;
