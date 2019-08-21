import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { composeAction } from '@actions/Compose';
import { toastAction } from '@actions/Toast';
import './index.scss';

const cutIcon = <FontAwesomeIcon icon={faTimes} />;

class Compose extends Component {
  state = {
    message: '',
    receiverEmail: '',
    status: 'sent',
    subject: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.sendMail({ ...this.state });
    this.setState({
      message: '',
      receiverEmail: '',
      status: 'sent',
      subject: '',
    });
  }

  setDraft = (e) => {
    this.setState({
      status: e.target.checked ? 'draft' : 'sent',
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { user: { email }, loading, close } = this.props;
    const { message, subject, receiverEmail } = this.state;
    return (
      <div className="composewrapper">
        <form onSubmit={this.handleSubmit} className="container icon">
          <div className="newmsg icon">
            <p>New Message</p>
            <div onClick={close} className="e-icon cutmsg">{cutIcon}</div>
          </div>
          <span className="composefrom">From</span>
          <span className="composesender">{email}</span>
          <span className="composeto icon">to</span>

          <input
            name="receiverEmail"
            type="email"
            onChange={this.handleChange}
            className="newmsgsearch"
            placeholder="Enter Contact Email"
            pattern="^\w+@epicmail.com$"
            required
            value={receiverEmail}
            title="Email must be a valid epic email e.g john@epicmail.com"
          />

          <input
            required
            id="composesubject"
            type="text"
            name="subject"
            onChange={this.handleChange}
            value={subject}
            placeholder="Subject"
            className="composesubject"
          />
          <textarea onChange={this.handleChange} value={message} required name="message" className="composemessage" />
          <button type="submit" disabled={loading} className="composesend">{loading ? 'Loading...' : 'Send'}</button>
          <div className="saveDraft icon">
            <input onChange={this.setDraft} type="checkbox" />
            <label className="icon" htmlFor="insavedraft">
              Save As Draft
            </label>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  loading: state.composeReducer.loading,
});

const mapDispatchToProps = {
  sendMail: composeAction,
  setToast: toastAction.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
