import React from 'react';
import './Button';

const Button = ({ classes, children, isSubmitting, onClick }) => {
  return (
    <button disabled={isSubmitting} onClick={onClick} className={`btn ${classes || ''}`}>
      {children}
    </button>
  );
};

export default Button;
