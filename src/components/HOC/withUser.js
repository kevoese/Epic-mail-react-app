import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserAction } from '@actions/Auth';

const withUser = (WrappedComponent) => {
  class HOC extends Component {
    componentDidMount() {
      this.props.setUser();
    }

    render() {
      return (
        this.props.isStarting ? ('loading') : (<WrappedComponent />)
      );
    }
  }

  const mapStateToProps = ({ authReducer }) => ({
    isStarting: authReducer.isStarting,
  });

  return connect(mapStateToProps, { setUser: setUserAction })(HOC);
};

export default withUser;
