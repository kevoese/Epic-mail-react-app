import React from 'react';
import '@components/Navbar/Navbar';
import Logo from '@components/Logo';

const Nav = ({ children }) => {
  return (
    <div className="nav">
      <Logo italic={false}>EPICMAIL</Logo>
      {children}
    </div>
  );
};

export default Nav;
