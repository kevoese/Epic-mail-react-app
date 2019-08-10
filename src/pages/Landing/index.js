import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Landing.scss';
import Footer from '@components/Footer';
import Button from '@components/Button';

class Landing extends Component {
  state = {
    isLoggedIn: false,
  };

  handleJoin = () => {
    this.props.history.push('/signup');
  }

  render() {
    const arrowIcon = <FontAwesomeIcon icon={faChevronRight} />;
    return (
      <div className="landing-page">
        <div className="backgnd">
          <svg width="500" height="291" viewBox="0 0 545 291" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M539.64 6.59729C539.64 58.5524 556.587 333.916 530.211 285.264C352.924 10.9313 77.5 157 0 0C122.102 0 148.947 0.000205648 288.493 0.000205648C428.039 0.000205648 519.165 5.8651e-05 539.64 6.59729Z" fill="#2660d3" fillOpacity="0.75" />
          </svg>
        </div>
        <div className="container">
          <div className="main">
            <div className="pageContent">
              <h2 className="pageWelcome">Epic Mail</h2>
              <p>
                  A platform where you can share information with your friends.
                Experience fast, smooth and easy exchange of information with Epic Mail.
              </p>
              <Button onClick={this.handleJoin} classes="register">
                {'Join now'}
                <div className="e-icon">{arrowIcon}</div>
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Landing;
