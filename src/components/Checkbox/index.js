import React from 'react';
import './Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Checkbox = ({ id, children, name }) => {
  let checkIcon = <FontAwesomeIcon icon={faCheck} />;

  return (
    <div className="checkbox">
      <input id={id} name={name} type="radio" />
      <label htmlFor={id}>
        {children}
        <div className="checkIcon">
          <div className="checked">{checkIcon}</div>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
