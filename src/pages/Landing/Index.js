import React, { Component } from 'react';
import './Landing';
import Footer from '@components/Footer';
import Nav from '@components/Navbar';
import Pagecontent from '@components/Pagecontent';
import Button from '@components/Button';
import Form from '@components/Form';
import Input from '@components/Form/input';
import Welcome from '@components/Welcome';
import axios from 'axios';

class Landing extends Component {
  state = {
    showForm: false,
    hidePageContent: false,
    signupForm: true,
    slideDelay: false,
    isSubmitting: false,
    errorMessage: '',
    isLogin: false,
    isError: false,
    showWelcome: false,
    token: localStorage.token || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    formInfo: {
      firstname: '',
      lastname: '',
      alternativeEmail: '',
      username: '',
      password: '',
      logEmail: '',
      logPassword: '',
    },
  };

  resetForm = () => {
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
  };

  axiosCall = async (url, details) => {
    let result;
    try {
      console.log('login state', this.state.isLogin);
      result = await axios.post(url, details);
      const data = result && result.data && result.data.data && result.data.data;
      this.setState({
        token: data.Token,
        user: data.user,
        showWelcome: !this.state.isLogin,
      });
      console.log('login state', data.user);
      console.log('show the welcome', this.state.showWelcome);
      localStorage.setItem('token', data.Token);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.resetForm();
    } catch ({ response }) {
      this.setState({
        isError: true,
        errorMessage: response && response.data && response.data.error,
      });
      result = false;
    }
    this.setState({
      isSubmitting: false,
    });
    console.log('login state', this.state.user);
    return result;
  };

  handleSubmit = async event => {
    event.preventDefault();
    const isLogin = event.target.id === 'formLogin' ? true : false;
    const {
      firstname,
      lastname,
      alternativeEmail,
      password,
      username,
      logEmail,
      logPassword,
    } = this.state.formInfo;
    this.setState({
      isSubmitting: true,
      isError: false,
      isLogin,
    });

    const app = 'https://epicmailappbykelvin.herokuapp.com/api/v2/';
    const appLocal = 'http://localhost:3000/api/v2/';

    const url = event.target.id === 'formLogin' ? `${app}auth/login` : `${app}auth/signup`;
    const details =
      event.target.id === 'formLogin'
        ? { email: logEmail, password: logPassword }
        : {
            firstname,
            lastname,
            email: `${username}@epicmail.com`,
            password,
            alternativeEmail,
          };
    await this.axiosCall(url, details);
  };

  handleJoin = () => {
    this.setState({
      showForm: true,
    });
  };

  handleChange = event => {
    this.setState({
      formInfo: {
        ...this.state.formInfo,
        [event.target.id]: event.target.value,
      },
    });
  };

  switchForms = () => {
    this.setState({
      slideDelay: true,
    });
    setTimeout(() => {
      this.setState({
        slideDelay: false,
      });
    }, 1300);
    this.setState({
      signupForm: !this.state.signupForm,
    });
  };

  render() {
    const {
      showForm,
      slideDelay,
      signupForm,
      formInfo,
      isError,
      isSubmitting,
      showWelcome,
      errorMessage,
    } = this.state;
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
      <div className="bg-color landing-page">
        {showWelcome ? (
          <Welcome />
        ) : (
          <>
            <div className={`backgnd ${showForm ? 'blur-back' : ''}`}></div>
            <div className="container">
              {showForm || (
                <Nav>
                  <span className="contactlink">CONTACT US</span>
                </Nav>
              )}
              <div className="main">
                {!showForm ? (
                  <Pagecontent handleJoin={this.handleJoin} />
                ) : (
                  <div className="formswrap">
                    <div
                      onClick={() => this.setState({ showForm: false })}
                      className="cut icon"
                    ></div>
                    <Form onSubmit={this.handleSubmit} isSubmitting={isSubmitting} id="formLogin">
                      <Input
                        id="logEmail"
                        value={logEmail}
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
                        value={logPassword}
                        classes="passwrd"
                        type="password"
                        placeholder="Password"
                        required
                      />
                      <Button isSubmitting={isSubmitting} classes="">
                        {isSubmitting ? 'Loading...' : 'LOGIN'}
                      </Button>
                      {isError && <p className="invalid">{errorMessage}</p>}
                    </Form>
                    <Form
                      onSubmit={this.handleSubmit}
                      isSubmitting={isSubmitting}
                      id="formRegister"
                      signup={true}
                    >
                      <Input
                        id="firstname"
                        value={firstname}
                        onChange={this.handleChange}
                        type="text"
                        pattern="^[\w]{3,20}$"
                        placeholder="Enter First name"
                        classes="fname"
                        title="name must contain 3 to 20 characters"
                      />
                      <Input
                        id="lastname"
                        value={lastname}
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
                        onChange={this.handleChange}
                        classes="passwrd"
                        pattern="^[\w@.]{7,20}$"
                        type="password"
                        placeholder="Password"
                        required
                      />
                      <Button isSubmitting={isSubmitting} classes="">
                        {' '}
                        {isSubmitting ? 'Loading...' : 'SIGN UP NOW'}
                      </Button>

                      {isError && <p className="invalid">{errorMessage}</p>}
                    </Form>

                    <div className={`slider ${signupForm ? 'moveright' : 'moveleft'}`}>
                      <h2 className="welcome">Welcome to Epic mail</h2>
                      <div className="bg-vector"></div>
                      <div className="logHere">
                        <h3> {!signupForm ? 'Not a member?' : 'Already a member'} </h3>
                        <Button
                          isSubmitting={slideDelay || isSubmitting}
                          onClick={this.switchForms}
                          className="regbtn"
                        >
                          {!signupForm ? 'Click here to register' : 'Click here to login'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {showForm || <Footer />}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Landing;
