'use client';

import React, { useState } from 'react';
import './NotificationList.scss';
import Image from 'next/image';

const notificationsData = [
  {
    "id": 1,
    "message": "Congratulations! You have been selected as [Top Ambassador] by [Spavitality Haven]. Click to make a decision if you would like to show it off or not.",
    "time": "3m ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 2,
    "message": "Congratulations! Your booking got accepted by [Harmony Haven Spa center]",
    "time": "5m ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 3,
    "message": "[Pure Pilates Oasis] replied back on your comment: 'When is the next free time for booking?'",
    "time": "1h ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 4,
    "message": "[Pure Pilates Oasis] replied back on your comment: 'Wow Is this happening today?'",
    "time": "1h ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 5,
    "message": "Congratulations! Your booking got accepted by [Spavitality Haven]",
    "time": "2h ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 6,
    "message": "Check out the new Digital Content on Gondli available for pro members only.",
    "time": "5h ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 7,
    "message": "Congratulations! You received a [20% sale] on your next booking for [Spa & Harmony Heights]",
    "time": "5h ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 8,
    "message": "Congratulations! Your booking got accepted by [Harmony Haven Spa center]",
    "time": "6h ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 9,
    "message": "[Pure Pilates Oasis] replied back on your comment: 'When is the next free time for booking?'",
    "time": "1d ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 10,
    "message": "[Pure Pilates Oasis] replied back on your comment: 'Wow Is this happening today?'",
    "time": "1d ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 11,
    "message": "Congratulations! Your booking got accepted by [Spavitality Haven]",
    "time": "2d ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 12,
    "message": "Check out the new Digital Content on Gondli available for pro members only.",
    "time": "3d ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  },
  {
    "id": 13,
    "message": "Congratulations! You received a [20% sale] on your next booking for [Spa & Harmony Heights]",
    "time": "4d ago",
    "logo": "/images/home/spa.svg",
    "mark": "/images/home/check.svg",
    "statusIcon": "/images/notifications/active.svg"
  }
];

const NotificationList: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleMarkAsRead = (id: number) => {
    console.log(`Notification ${id} marked as read.`);
    setDropdownVisible(null);
  };

  const handleDelete = (id: number) => {
    console.log(`Notification ${id} deleted.`);
    setDropdownVisible(null);
  };

  return (
    <React.Fragment>
      <div className="notificationList">
        <div className="container">
          <div className="notificationsWrapper">
            <div className="header">
              <h2>Notifications</h2>
              <div className="btns">
                <button className="btn">Mark all as read</button>
                <button className="btn">Clear all</button>
              </div>
            </div>
            <div className="list">
              {notificationsData.map((notification) => (
                <div className="notificationWrap" key={notification.id}>
                  <div className="logoContent">
                    <div className="logoWrap">
                      <div className="logo">
                        <Image
                          width={50}
                          height={50}
                          src={notification.logo}
                          alt="logo"
                        />
                      </div>
                      <Image className='mark' width={100} height={100} src={notification.mark} alt="mark" />
                    </div>
                    <div className="content">
                      <p>
                        {notification.message.split(/\[|\]/).map((part, index) => {
                        return part && (part === 'Top Ambassador' || part === 'Spavitality Haven' || part === 'Harmony Haven Spa center' || part === 'Pure Pilates Oasis' || part === '20% sale' || part === 'Spa & Harmony Heights') ? (
                          <b key={index}>{part}</b>
                          ) : (
                            part
                          );
                        })}
                      </p>
                      <p className='time'>{notification.time}</p>
                    </div>

                  </div>
                  <div className="icons">
                    <div className="active">
                      <Image
                        width={50}
                        height={50}
                        src={notification.statusIcon}
                        alt="status"
                      />
                    </div>
                    <div className="readAll">
                      <Image
                        width={50}
                        height={50}
                        src="/images/notifications/readBtn.png"
                        alt="readBtn"
                        onClick={() => toggleDropdown(notification.id)}
                        style={{ cursor: 'pointer' }}
                      />
                      {dropdownVisible === notification.id && (
                        <div className="dropdown">
                          <button
                            className="dropdown-item"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Image
                              width={20}
                              height={20}
                              src="/images/notifications/check.svg"
                              alt="check"
                            />
                            Mark as Read
                          </button>
                          <button
                            className="dropdown-item"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Image
                              width={20}
                              height={20}
                              src="/images/notifications/del.svg"
                              alt="del"
                            />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotificationList;
