import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelopeOpen, faEnvelope, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import Moment from 'react-moment';

const messagepanel = ({ messageObj }) => {
  const {
    message_id, firstname, lastname, message, subject, created_on,
  } = messageObj;

  const status = messageObj.read_status;

  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const unreadIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const readIcon = <FontAwesomeIcon icon={faEnvelopeOpen} />;
  const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
  const dateStr = <Moment format="MMM D YYYY" withTitle>{created_on}</Moment>;
  // const groupnamehtml = (groupName) ? `<p class="groupname_msg icon">${groupName}</p>` : ' ';

  return (
    <div id={`${message_id}_small`} className={`messageBox ${status}msg`}>
      <div className="icon msgStatus">{ status === 'read' ? readIcon : unreadIcon }</div>
      <div className="username">
        <span className="icon">{userIcon}</span>
        <p>{`${firstname} ${lastname}`}</p>
      </div>
      {/* {groupnamehtml} */}
      <p className="msgdate">
        {dateStr}
      </p>
      <p className="msgtitle">
        {subject}
      </p>
      <p className="msgcontent">
        {message}
      </p>
      <div className="deletediv">
        <span className="icon">{deleteIcon}</span>
      </div>
    </div>
  );
};

export default messagepanel;
