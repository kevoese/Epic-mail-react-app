import React, { Component } from 'react';
import Tab from '@components/Tab';
import Checkbox from '@components/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInbox, faEdit, faPaperPlane, faUsers,
} from '@fortawesome/free-solid-svg-icons';
// import Input from '@components/Form/input';
import './Inbox.scss';
// import axios from 'axios';

class Inbox extends Component {
state = {
  token: localStorage.token || null,
  user: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')),
  switchState: 'showInbox',
};

  handleSwitch = (event) => {
    const { id } = event.target;
    switch (id) {
      case 'inbox':
        this.setState({
          switchState: 'showInbox',
        });
        break;
      case 'sent':
        this.setState({
          switchState: 'showSent',
        });
        break;
      case 'draft':
        this.setState({
          switchState: 'showDraft',
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { switchState } = this.state;
    const inboxIcon = <FontAwesomeIcon icon={faInbox} />;
    const sentIcon = <FontAwesomeIcon icon={faPaperPlane} />;
    const draftIcon = <FontAwesomeIcon icon={faEdit} />;

    return (
      <div className="inbox">
        <div className="wrapper">
          <div className="msgTabs">
            <div className="groupLink">
              <span>View groups</span>
              <div>
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </div>
            <div className="tabs">
              <Tab id="inbox" name="inboxTabs" handleSwitch={this.handleSwitch} icon={inboxIcon}>
                Inbox
              </Tab>
              <Tab id="sent" name="inboxTabs" handleSwitch={this.handleSwitch} icon={sentIcon}>
                Sent
              </Tab>
              <Tab id="draft" name="inboxTabs" handleSwitch={this.handleSwitch} icon={draftIcon}>
                Draft
              </Tab>
            </div>
            <div className="filters">
              <Checkbox id="all" name="filter" icon={inboxIcon}>
                All
              </Checkbox>
              <Checkbox id="read" name="filter" icon={sentIcon}>
                Read
              </Checkbox>
              <Checkbox id="unread" name="filter" icon={draftIcon}>
                Unread
              </Checkbox>
            </div>
            <div className={`msgcontainer ${switchState}`}>
              <div className="inboxDiv">inbox</div>
              <div className="sentDiv">sent</div>
              <div className="draftDiv">draft</div>
            </div>
          </div>
          <div className="msgContent" />
        </div>
      </div>
    );
  }
}

export default Inbox;
