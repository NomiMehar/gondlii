import React from 'react';
import './HeaderInput.scss';
import Image from 'next/image';

const HeaderInput: React.FC = () => {
  return (
    <React.Fragment>
      <div className="headerInput">
        <Image priority width={24} height={24} src="/images/home/SearchOutline.svg" alt="SearchOutline" />
        <input
          spellCheck='false'
          type="text"
          placeholder="Enter service, location, or therapist"
        />
        <button>Search</button>
      </div>
    </React.Fragment>
  );
};

export default HeaderInput;
