/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './mainNav.scss';
import { removeUser } from '@actions/Auth';
import { connect } from 'react-redux';

class mainNav extends Component {
  state = {
    showMenu: false,
    path: this.props.history.location.pathname,
  }

  componentWillReceiveProps(newProps) {
    const { pathname, isLoggedIn, history } = this.props;
    if (pathname !== newProps.pathname) {
      if (isLoggedIn && newProps.pathname.includes('/signup', '/welcome')) {
        history.push('/inbox');
      } else if (!isLoggedIn && newProps.pathname.includes('/inbox', '/groups', '/profile')) {
        history.push('/signup');
      }
    }
  }

  handleLogout = async () => {
    this.setState({
      showMenu: false,
    });
    await this.props.logout();
  };

  dropDown = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }));
  };

  render() {
    const {
      user, isLoggedIn,
    } = this.props;
    const profile_pic = user && user.profile_pic;
    const firstname = user && user.firstname;
    const lastname = user && user.lastname;
    return (
      <nav className="navbar">
        <div className="mailLogo">
          <Link to="/"><span>Epic-mail</span></Link>
        </div>
        <div className="profile">
          {
       (!isLoggedIn)
         ? (
           <div className="navInfo">
             <Link to="/"><span>Home</span></Link>
             <Link to="/"><span>Contact us</span></Link>
             <Link to="/"><span>About</span></Link>
           </div>
         )
         : (
           <div className="dropDown" onClick={this.dropDown}>
             <img
               src={profile_pic || 'https://i.imgur.com/wtjaVfi.png'}
               alt=""
               className="profilePic"
             />
             <svg
               width="3"
               height="15"
               viewBox="0 0 3 15"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <circle cx="1.5" cy="1.5" r="1.5" fill="#5B5A5A" />
               <circle cx="1.5" cy="13.5" r="1.5" fill="#5B5A5A" />
               <circle cx="1.5" cy="7.5" r="1.5" fill="#5B5A5A" />
             </svg>
           </div>
         )
        }
        </div>
        <ul className={`links ${!this.state.showMenu ? 'hide' : ''}`}>
          <li className="userProfile">
            <img
              src={profile_pic || 'https://i.imgur.com/wtjaVfi.png'}
              alt=""
              className="profilePic"
            />
            <span>
              {firstname}
              {' '}
              {' '}
              {lastname}
            </span>

          </li>
          <li>Groups</li>
          <Link to="/"><li>Inbox</li></Link>
          <Link to="/"><li>Contact us</li></Link>
          <Link to="/"><li>About</li></Link>
          <Link to="/signup"><li onClick={this.handleLogout}>Sign out</li></Link>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  isLoggedIn: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(mainNav);
