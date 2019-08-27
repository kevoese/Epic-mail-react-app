/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from '@components/Tab';
import Compose from '@components/Compose';
import Checkbox from '@components/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInbox,
  faEdit,
  faPaperPlane,
  faUsers,
  faSpinner,
  faPlus,
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
const plusIcon = <FontAwesomeIcon icon={faPlus} />;
const spinnerIcon = <FontAwesomeIcon icon={faSpinner} spin />;

class Inbox extends Component {
  state = {
    user: this.props.user,
    switchState: 'showInbox',
    showCompose: false,
    showMsgBox: false,
  };

  msgboxRef = React.createRef();

  hamburgerRef = React.createRef();

  componentDidMount() {
    this.props.getInbox({ type: 'all' });
    this.props.getSent();
    this.props.getDraft();
  }

  componentDidUpdate() {
    document.addEventListener('click', this.closeInbox);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeInbox);
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

  openCompose = () => {
    this.setState({
      showCompose: true,
    });
  };

  hideCompose = () => {
    this.setState({
      showCompose: false,
    });
  };

  openInbox = () => {
    this.setState({
      showMsgBox: true,
    });
  };

  closeInbox = (e) => {
    if (e.target.parentElement.getAttribute('name') === 'inboxmsg') {
      this.setState({
        showMsgBox: false,
      });
      return;
    }

    if (
      (this.msgboxRef.current && this.msgboxRef.current.contains(e.target))
      || (this.hamburgerRef.current
        && this.hamburgerRef.current.contains(e.target))
    ) {
      this.setState({
        showMsgBox: true,
      });
      return;
    }

    this.setState({
      showMsgBox: false,
    });
  };

  handleFilter = (event) => {
    const { id } = event.target;
    if (this.props.inboxType !== id) {
      this.props.getInbox({ type: id });
    }
  };

  handleView = (event) => {
    const msgBox = event.target.parentElement;
    if (msgBox.classList[0] === 'messageBox') {
      const { id } = msgBox;
      this.props.viewMsg(id);
    }
  };

  render() {
    const { switchState, showMsgBox } = this.state;
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

    const messageList = messages && messages.length >= 1
      ? messages.map(msg => (
        <MessageBox
          key={msg.message_id}
          messageObj={msg}
          onClick={this.handleView}
        />
      ))
      : <p className="empty">No Inbox message</p>;
    const sentList = sentMessages && sentMessages.length >= 1
      ? sentMessages.map(msg => (
        <MessageBox
          key={msg.message_id}
          messageObj={msg}
          onClick={this.handleView}
        />
      ))
      : <p className="empty">No sent message</p>;
    const draftList = draftMessages && draftMessages.length >= 1
      ? draftMessages.map(msg => (
        <MessageBox
          key={msg.message_id}
          messageObj={msg}
          onClick={this.handleView}
        />
      ))
      : <p className="empty">No draft message</p>;

    const specificMsgDiv = specificMsg
      ? <MessageView messageObj={specificMsg} />
      : '';

    return (
      <div className="inbox">
        <div
          ref={this.hamburgerRef}
          onClick={this.openInbox}
          className="hamburger"
        >
          <svg
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="19" height="3" fill="#2660D3" />
            <rect y="14" width="19" height="3" fill="#2660D3" />
            <rect y="7" width="19" height="3" fill="#2660D3" />
          </svg>
        </div>
        <div className="wrapper">
          <div
            ref={this.msgboxRef}
            className={`msgTabs ${showMsgBox ? 'show' : 'hide'}`}
          >
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
              <Checkbox
                id="all"
                onClick={this.handleFilter}
                name="filter"
                icon={inboxIcon}
              >
                All
              </Checkbox>
              <Checkbox
                id="read"
                onClick={this.handleFilter}
                name="filter"
                icon={sentIcon}
              >
                Read
              </Checkbox>
              <Checkbox
                id="unread"
                onClick={this.handleFilter}
                name="filter"
                icon={draftIcon}
              >
                Unread
              </Checkbox>
            </form>
            <div className={`msgcontainer ${switchState}`}>
              <div name="inboxmsg" className="inboxDiv">
                {inboxLoading ? loader : messageList}
              </div>
              <div name="inboxmsg" className="sentDiv">{sentLoading ? loader : sentList}</div>
              <div name="inboxmsg" className="draftDiv">
                {draftLoading ? loader : draftList}
              </div>
            </div>
          </div>
          <div className="thread">
            { showMsgBox ? <div className="overlay" /> : ''}
            {!this.state.showCompose
              ? ' '
              : <Compose close={this.hideCompose} />}
            <div className="msgContent">
              {viewLoading ? loader : specificMsgDiv}
            </div>
            <div onClick={this.openCompose} className="plus">
              {plusIcon}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  inboxReducer,
  sentReducer,
  draftReducer,
  authReducer,
  specificMsgReducer,
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
