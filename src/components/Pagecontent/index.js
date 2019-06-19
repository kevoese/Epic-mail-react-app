import React from 'react';
import Button from '@components/Button';
import './Pagecontent';

const Pagecontent = ({ classes, handleJoin }) => {
  return (
    <div className={` pageContent ${classes || ''}`}>
      <h2 className="pageWelcome">Epic Mail</h2>
      <p>Experience fast, smooth and easy exchange of information with Epic Mail.</p>
      <Button onClick={handleJoin} classes="register icon">
        Join now
      </Button>
    </div>
  );
};

export default Pagecontent;
