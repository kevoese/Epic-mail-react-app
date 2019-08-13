/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from '@components/Tab';
import Checkbox from '@components/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInbox,
  faEdit,
  faPaperPlane,
  faUsers,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { getInboxAction } from '@actions/Inbox';
import MessageBox from '@components/MessageBox';
import MessageView from '@components/MessageView';
import './Inbox.scss';
import { getdraftAction } from '@actions/Draft';
import { getsentAction } from '@actions/Sent';
import { viewMsgAction } from '@actions/SpecificMessage';

const inboxIcon = <FontAwesomeIcon icon={faInbox} />;
const sentIcon = <FontAwesomeIcon icon={faPaperPlane} />;
const draftIcon = <FontAwesomeIcon icon={faEdit} />;
const spinnerIcon = <FontAwesomeIcon icon={faSpinner} spin />;

class Inbox extends Component {
  state = {
    user: this.props.user,
    switchState: 'showInbox',
  };

  componentDidMount() {
    this.props.getInbox({ type: 'all' });
    this.props.getSent();
    this.props.getDraft();
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

  handleFilter = (event) => {
    const { id } = event.target;
    if (this.props.inboxType !== id) {
      this.props.getInbox({ type: id });
    }
  }

  handleView = (event) => {
    const msgBox = event.target.parentElement;
    if (msgBox.classList[0] === 'messageBox') {
      const { id } = msgBox;
      this.props.viewMsg(id);
    }
  }

  render() {
    const { switchState } = this.state;
    const {
      messages,
      sentMessages,
      draftMessages,
      sentLoading,
      inboxLoading,
      draftLoading,
      viewLoading,
      specificMsg,
    } = this.props;

    const loader = <div className="spin">{spinnerIcon}</div>;

    const messageList = messages && messages.length >= 1 ? (
      messages.map(msg => (
        <MessageBox key={msg.message_id} messageObj={msg} onClick={this.handleView} />
      ))
    ) : (
      <p className="empty">No Inbox message</p>
    );
    const sentList = sentMessages && sentMessages.length >= 1 ? (
      sentMessages.map(msg => (
        <MessageBox key={msg.message_id} messageObj={msg} onClick={this.handleView} />
      ))
    ) : (
      <p className="empty">No sent message</p>
    );
    const draftList = draftMessages && draftMessages.length >= 1 ? (
      draftMessages.map(msg => (
        <MessageBox key={msg.message_id} messageObj={msg} onClick={this.handleView} />
      ))
    ) : (
      <p className="empty">No draft message</p>
    );

    const specificMsgDiv = specificMsg ? <MessageView messageObj={specificMsg} /> : '';

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
              <Tab
                id="inbox"
                name="inboxTabs"
                handleSwitch={this.handleSwitch}
                icon={inboxIcon}
              >
                Inbox
              </Tab>
              <Tab
                id="sent"
                name="inboxTabs"
                handleSwitch={this.handleSwitch}
                icon={sentIcon}
              >
                Sent
              </Tab>
              <Tab
                id="draft"
                name="inboxTabs"
                handleSwitch={this.handleSwitch}
                icon={draftIcon}
              >
                Draft
              </Tab>
            </div>
            <form className="filters">
              <Checkbox id="all" onClick={this.handleFilter} name="filter" icon={inboxIcon}>
                All
              </Checkbox>
              <Checkbox id="read" onClick={this.handleFilter} name="filter" icon={sentIcon}>
                Read
              </Checkbox>
              <Checkbox id="unread" onClick={this.handleFilter} name="filter" icon={draftIcon}>
                Unread
              </Checkbox>
            </form>
            <div className={`msgcontainer ${switchState}`}>
              <div className="inboxDiv">{inboxLoading ? loader : messageList}</div>
              <div className="sentDiv">{sentLoading ? loader : sentList}</div>
              <div className="draftDiv">{draftLoading ? loader : draftList}</div>
            </div>
          </div>
          <div className="thread">
            <div className="msgContent">
              {viewLoading ? loader : specificMsgDiv}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  inboxReducer, sentReducer, draftReducer, authReducer, specificMsgReducer,
}) => ({
  messages: inboxReducer.messages,
  inboxLoading: inboxReducer.isLoading,
  inboxType: inboxReducer.type,
  sentMessages: sentReducer.messages,
  sentLoading: sentReducer.isLoading,
  draftMessages: draftReducer.messages,
  draftLoading: draftReducer.isLoading,
  specificMsg: specificMsgReducer.messages,
  viewLoading: specificMsgReducer.isLoading,
  user: authReducer.user,
});

const mapDispatchToProps = {
  getInbox: getInboxAction,
  getDraft: getdraftAction,
  getSent: getsentAction,
  viewMsg: viewMsgAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
