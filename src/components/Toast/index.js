/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Toast.scss';
import { noToast } from '@actions/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

class Toast extends Component {
  state = {
    showToast: this.props.show || false,
  }

  handleClick = () => {
    const { close } = this.props;
    close();
  }

  render() {
    const { show, message, status } = this.props;
    const custom = status === 'danger' ? 'danger' : ' ';
    return (
      show
        ? (
          <div className={`toast ${custom}`}>
            <div className="e-icon" onClick={this.handleClick}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <span>{message}</span>
          </div>
        )
        : <></>
    );
  }
}

const mapStateToProps = store => ({
  show: store.toastReducer.showToast,
  message: store.toastReducer.message,
  status: store.toastReducer.status,
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(noToast()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
