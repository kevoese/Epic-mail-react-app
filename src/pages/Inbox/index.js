
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from '@components/Tab';
import Checkbox from '@components/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInbox, faEdit, faPaperPlane, faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { getInboxAction } from '@actions/Inbox';
import MessageBox from '@components/MessageBox';
import './Inbox.scss';

class Inbox extends Component {
state = {
  user: this.props.user,
  switchState: 'showInbox',
  messageList: [],
};

componentDidMount() {
  this.props.getInbox();
}


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
    const { messages } = this.props;
    const inboxIcon = <FontAwesomeIcon icon={faInbox} />;
    const sentIcon = <FontAwesomeIcon icon={faPaperPlane} />;
    const draftIcon = <FontAwesomeIcon icon={faEdit} />;
    const messageList = messages.length >= 1 ? messages.map(msg => <MessageBox key={msg.message_id} messageObj={msg} />) : 'empty';

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
              <div className="inboxDiv">
                {messageList}
              </div>
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

const mapStateToProps = ({ inboxReducer }) => ({
  messages: inboxReducer.messages,
});

export default connect(mapStateToProps, { getInbox: getInboxAction })(Inbox);
