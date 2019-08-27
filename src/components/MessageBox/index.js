import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelopeOpen, faEnvelope, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import Moment from 'react-moment';

const messagepanel = ({ messageObj, onClick }) => {
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
    <Fragment>
      <input type="radio" id={`${message_id}msgBox`} name="msgBox" className="msgBoxInput" />
      <label htmlFor={`${message_id}msgBox`} name="inboxmsg" id={`${message_id}_small`} onClick={onClick} className={`messageBox ${status}msg`}>
        { status ? <div className="icon msgStatus">{ status === 'read' ? readIcon : unreadIcon }</div> : ''}
        <div className="username">
          <span className="icon">{userIcon}</span>
          {`${firstname} ${lastname}`}
        </div>
        {/* {groupnamehtml} */}
        <p className="groupname"> </p>
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
      </label>
    </Fragment>
  );
};

export default messagepanel;
