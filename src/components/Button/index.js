/* eslint-disable react/button-has-type */
import React from 'react';
import './Button.scss';

const Button = ({
  classes, children, isSubmitting, onClick, ...rest
}) => (
  <button disabled={isSubmitting} {...rest} onClick={onClick} className={`btn ${classes || ''}`}>
    {isSubmitting ? 'Loading...' : children}
  </button>
);

export default Button;
