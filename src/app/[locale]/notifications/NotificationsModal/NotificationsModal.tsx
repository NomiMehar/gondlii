import React from 'react';
import { Modal } from 'react-bootstrap';
import './NotificationsModal.scss';
import Image from 'next/image';

interface NotificationsModalProps {
  show: boolean;
  onClose: () => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered className="notifications-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <Image priority  src="/images/logo/dark.svg" width={85} height={20} alt="logo" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h2 className="notifications-title">Top Ambassador Badge</h2>
          <p className="notifications-description">
            You have been selected as <b>Top Ambassador</b> by <b>Spavitality Haven.</b> <br />
            Would you like to show it off?
          </p>
        </div>
        <div className="badgeBack">
          <div className="badge">
            <Image priority  src="/images/notifications/badgeBack.svg" width={85} height={85} alt="Top Ambassador Badge" />
          </div>
          <div className="badgeContent">
            <div className="content">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <Image priority  src="/images/home/user.svg" width={40} height={40} alt="Badge" />
                </div>
                <div className="flex-grow-1 ms-2">
                  <p className='flex align-items-center'><b>Madelina H.</b>
                    <Image priority  className='ms-1' src="/images/notifications/badge.svg" width={17} height={17} alt="Badge" /></p>
                  <p>Visited Spavitality Haven <b>15 times</b></p>
                </div>
              </div>
              <span>1</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <div className="buttons">
        <button onClick={onClose}>No Thanks</button>
        <button onClick={onClose}>Show Off</button>
      </div>
    </Modal>
  );
};

export default NotificationsModal;
