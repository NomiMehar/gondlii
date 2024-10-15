import React from 'react';
import { Modal } from 'react-bootstrap';
import './LanguageModal.scss';
import Image from 'next/image';

interface LanguageModalProps {
  show: boolean;
  onClose: () => void;
  selectedLanguage: string;
  handleLanguageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  show,
  onClose,
  selectedLanguage = 'English (United States)',
  handleLanguageChange,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered className="language-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <Image src="/images/logo/dark.svg" width={85} height={20} alt="logo" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
        <h2 className="language-title">Select Language</h2>
        <p className="language-description">
          Choose your preferred language for Gondli
        </p>
        </div>
        <div className="language-options">
          <label className={`language-option ${selectedLanguage === 'English (United States)' ? 'selected' : ''}`}>
            <input
            spellCheck='false'
              type="radio"
              name="language"
              value="English (United States)"
              checked={selectedLanguage === 'English (United States)'}
              onChange={handleLanguageChange}
            />
            English (United States)
          </label>
          <label className={`language-option ${selectedLanguage === 'Deutsch (German)' ? 'selected' : ''}`}>
            <input
            spellCheck='false'
              type="radio"
              name="language"
              value="Deutsch (German)"
              checked={selectedLanguage === 'Deutsch (German)'}
              onChange={handleLanguageChange}
            />
            Deutsch (German)
          </label>
          <label className={`language-option ${selectedLanguage === 'Français (French)' ? 'selected' : ''}`}>
            <input
            spellCheck='false'
              type="radio"
              name="language"
              value="Français (French)"
              checked={selectedLanguage === 'Français (French)'}
              onChange={handleLanguageChange}
            />
            Français (French)
          </label>
          <label className={`language-option ${selectedLanguage === 'Italiano (Italian)' ? 'selected' : ''}`}>
            <input
            spellCheck='false'
              type="radio"
              name="language"
              value="Italiano (Italian)"
              checked={selectedLanguage === 'Italiano (Italian)'}
              onChange={handleLanguageChange}
            />
            Italiano (Italian)
          </label>
        </div>
      </Modal.Body>
        <button className="change-language-button" onClick={onClose}>
          Change Language
        </button>
    </Modal>
  );
};

export default LanguageModal;
