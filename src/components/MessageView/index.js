import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShare, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import Moment from 'react-moment';

const messageView = ({ messageObj }) => {
  const {
    senderName,
    receiverName,
    message_id,
    subject,
    message,
    created_on,
    status,
    profile_photo,
    email,
    thread_id,
  } = messageObj;

  const forwardIcon = <FontAwesomeIcon icon={faShare} />;
  const draftIcon = <FontAwesomeIcon className="icon" icon={faPencilAlt} />;
  const dateStr = <Moment format="MMM D YYYY" withTitle>{created_on}</Moment>;

  return (
    <div id={`${message_id}_big`} className="messageView">
      <div className="msginfo">
        <span className="subject">{subject}</span>
        <span className="sender">
          {senderName}
          { !status ? (
            <p>
              {`< ${email} >`}
            </p>
          ) : ''}
        </span>
        <span className="from">From:</span>
        <span className="to icon">to:</span>
        <span className="receiver">
          {receiverName}
          { status ? (
            <p>
              {`< ${email} >`}
            </p>
          ) : ''}
        </span>
        {thread_id ? <button id={`${thread_id}_thread`} type="button" className="viewthread">View thread</button> : ' '}
        <img src={profile_photo || 'https://i.imgur.com/wtjaVfi.png'} className="senderimg" alt="img" />
        <span className="messageDate icon">
          {dateStr}
        </span>
      </div>
      <p className="msgP">
        {message}
      </p>
      {(receiverName === 'You') ? <button id="replybtn" type="button" className="replybtn icon">Reply</button> : ' '}
      <button id="fwdbtn" type="button" className="fwdbtn icon">
        Forward
        <span className="icon">{forwardIcon}</span>
      </button>
      { (status === 'draft') ? <button id="draftbtn" type="button" className="draftbtn icon">{draftIcon}</button> : ' '}
    </div>
  );
};

export default messageView;
