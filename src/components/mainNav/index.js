/* eslint-disable camelcase */
import React from 'react';
import './mainNav.scss';
import epicLogo from '../../images/epicLogo.png';

const mainNav = () => {
  const { profile_pic } = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar">
      <div className="mailLogo">
        <img src={epicLogo} alt="logo" />
        <span>Epic mail</span>
      </div>
      <div className="profile">
        <img
          src={profile_pic || 'https://i.imgur.com/wtjaVfi.png'}
          alt=""
          className="profile-pic"
        />
        <svg
          width="3"
          height="15"
          viewBox="0 0 3 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="1.5" cy="1.5" r="1.5" fill="#5B5A5A" />
          <circle cx="1.5" cy="13.5" r="1.5" fill="#5B5A5A" />
          <circle cx="1.5" cy="7.5" r="1.5" fill="#5B5A5A" />
        </svg>
      </div>
    </nav>
  );
};

export default mainNav;
