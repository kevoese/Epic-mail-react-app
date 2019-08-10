import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faLock,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './Access.scss';
import Button from '@components/Button';
import Form from '@components/Form';
import Input from '@components/Form/Input';
import { registerAction } from '@actions/SignUp';
import { loginAction } from '@actions/SignIn';
import { toastAction } from '@actions/Toast';

class Access extends Component {
  state = {
    signupForm: true,
    slideDelay: false,
    formInfo: {
      firstname: '',
      lastname: '',
      alternativeEmail: '',
      username: '',
      password: '',
      logEmail: '',
      logPassword: '',
    },
  }

  async componentWillUnmount() {
    const { signInCleanUp, signUpCleanUp } = this.props;
    await signInCleanUp();
    await signUpCleanUp();
  }

  resetForm = () => {
    const {
      signInCompleted,
      signUpCompleted,
      signInSuccess,
      signUpSuccess,
      signInError,
      signUpError,
      setToast,
      message,
      history,
    } = this.props;

    if (signInCompleted || signUpCompleted) {
      const isError = this.state.signupForm ? signUpError : signInError;
      const status = isError ? 'danger' : 'success';
      setToast({
        status,
        message,
        time: 3000,
      });
    }
    if (signInSuccess || signUpSuccess) {
      this.setState({
        formInfo: {
          firstname: '',
          lastname: '',
          alternativeEmail: '',
          username: '',
          password: '',
          logEmail: '',
          logPassword: '',
        },
      });
      if (signInSuccess) {
        history.push('/inbox');
      } else if (signUpSuccess) {
        history.push('/welcome');
      }
    }
  };

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState(prevState => ({
      formInfo: {
        ...prevState.formInfo,
        [id]: value,
      },
    }));
  };

  handleSubmit = async (event) => {
    const {
      formInfo: {
        firstname,
        lastname,
        alternativeEmail,
        password,
        username,
        logEmail,
        logPassword,
      },
    } = this.state;

    const {
      registerUser, loginUser,
    } = this.props;

    const { id } = event.target;

    event.preventDefault();
    const isLogin = id === 'formLogin';

    if (isLogin) {
      await loginUser({ email: logEmail, password: logPassword });
    } else {
      await registerUser({
        firstname,
        lastname,
        email: `${username}@epicmail.com`,
        password,
        alternativeEmail,
      });
    }

    this.resetForm();
  }

  switchForms = () => {
    this.setState({
      slideDelay: true,
    });
    setTimeout(() => {
      this.setState({
        slideDelay: false,
      });
    }, 1300);
    this.setState(prevState => ({
      signupForm: !prevState.signupForm,
    }));
  };


  render() {
    const userIcon = <FontAwesomeIcon icon={faUser} />;
    const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
    const passwordIcon = <FontAwesomeIcon icon={faLock} />;

    const {
      slideDelay,
      signupForm,
      formInfo,
    } = this.state;

    const {
      isLoading,
    } = this.props;

    const {
      firstname,
      lastname,
      alternativeEmail,
      password,
      username,
      logEmail,
      logPassword,
    } = formInfo;

    return (
      <div className="accessBg">
        <div className="backgnd">
          <svg width="500" height="291" viewBox="0 0 545 291" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M539.64 6.59729C539.64 58.5524 556.587 333.916 530.211 285.264C352.924 10.9313 77.5 157 0 0C122.102 0 148.947 0.000205648 288.493 0.000205648C428.039 0.000205648 519.165 5.8651e-05 539.64 6.59729Z" fill="#2660d3" fillOpacity="0.95" />
          </svg>
        </div>
        <div className="formswrap">
          <Form onSubmit={this.handleSubmit} isSubmitting={isLoading} id="formLogin">
            <Input
              id="logEmail"
              value={logEmail}
              icon={userIcon}
              onChange={this.handleChange}
              type="text"
              pattern="^\w+@epicmail.com$"
              classes="emailicon "
              placeholder="Email"
              title="Enter a valid Epic-mail email"
            />
            <Input
              id="logPassword"
              onChange={this.handleChange}
              icon={passwordIcon}
              value={logPassword}
              classes="passwrd"
              type="password"
              placeholder="Password"
              required
            />
            <Button isSubmitting={isLoading} type="submit" classes="">
              LOGIN
            </Button>
          </Form>
          <Form
            onSubmit={this.handleSubmit}
            isSubmitting={isLoading}
            id="formRegister"
            signup
          >
            <Input
              id="firstname"
              value={firstname}
              onChange={this.handleChange}
              icon={userIcon}
              type="text"
              pattern="^[\w]{3,20}$"
              placeholder="Enter First name"
              classes="fname"
              title="name must contain 3 to 20 characters"
            />
            <Input
              id="lastname"
              value={lastname}
              icon={userIcon}
              onChange={this.handleChange}
              type="text"
              pattern="^[\w]{3,20}$"
              placeholder="Enter Last name"
              classes=" lname"
              title="name must contain 3 to 20 characters"
            />
            <Input
              id="username"
              value={username}
              icon={userIcon}
              onChange={this.handleChange}
              pattern="^[\w@]{3,20}$"
              type="text"
              classes="username"
              placeholder="Enter username"
              title="Username must contain 3 to 20 characters"
            />
            <Input
              id="alternativeEmail"
              value={alternativeEmail}
              icon={emailIcon}
              onChange={this.handleChange}
              type="text"
              pattern="^\w+@[\w]{2,20}.[a-z]{2,5}$"
              classes="emailicon"
              placeholder="Enter Recovery Email"
              title="Email must be a valid email e.g john@gmail.com"
            />
            <Input
              id="password"
              value={password}
              icon={passwordIcon}
              onChange={this.handleChange}
              classes="passwrd"
              pattern="^[\w@.]{7,20}$"
              type="password"
              placeholder="Password"
              required
            />
            <Button isSubmitting={isLoading} type="submit" classes="">
              SIGN UP NOW
            </Button>
          </Form>

          <div className={`slider ${signupForm ? 'moveright' : 'moveleft'}`}>
            <h2 className="welcome">Welcome to Epic mail</h2>
            <div className="bg-vector" />
            <div className="logHere">
              <h3>
                {!signupForm ? 'Not a member?' : 'Already a member?'}
              </h3>
              <Button
                isSubmitting={slideDelay || isLoading}
                onClick={this.switchForms}
                className="regbtn"
              >
                {!signupForm ? 'Click here to register' : 'Click here to login'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Access.propTypes = {
  isLoading: PropTypes.bool,
  signUpError: PropTypes.bool,
  signInError: PropTypes.bool,
  message: PropTypes.string,
  signInCompleted: PropTypes.bool,
  signUpCompleted: PropTypes.bool,
  signInSuccess: PropTypes.bool,
  signUpSuccess: PropTypes.bool,
};

Access.defaultProps = {
  isLoading: false,
  signUpError: false,
  signInError: true,
  message: null,
  signInCompleted: false,
  signUpCompleted: false,
  signInSuccess: false,
  signUpSuccess: false,
};

const mapStateToProps = store => ({
  isLoading: store.signUpReducer.isLoading || store.signInReducer.isLoading,
  signInError: store.signInReducer.isError,
  signUpError: store.signUpReducer.isError,
  signUpCompleted: store.signUpReducer.isCompleted,
  signInCompleted: store.signInReducer.isCompleted,
  signUpSuccess: store.signUpReducer.isSuccess,
  signInSuccess: store.signInReducer.isSuccess,
  message: store.signUpReducer.message || store.signInReducer.message,
});

const mapDispatchToProps = {
  registerUser: registerAction.registerUser,
  loginUser: loginAction.loginUser,
  setToast: toastAction.setToast,
  signUpCleanUp: registerAction.cleanUp,
  signInCleanUp: loginAction.cleanUp,
};


export default connect(mapStateToProps, mapDispatchToProps)(Access);
