import React from 'react';
import './Logo';

const Logo = ({ italic, children }) => {
  return (
    <div className="logo">
      {' '}
      <a className={italic ? 'logo-italic' : ''} to="">
        {children}
      </a>
    </div>
  );
};

export default Logo;
