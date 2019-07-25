import React from 'react';
import './Button.scss';

const Button = ({ classes, children, isSubmitting, onClick }) => {
  return (
    <button disabled={isSubmitting} onClick={onClick} className={`btn ${classes || ''}`}>
      {isSubmitting ? 'Loading...' : children}
    </button>
  );
};

export default Button;
