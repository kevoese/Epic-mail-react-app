import React, { Component } from 'react';
import './Landing';
import Footer from '@components/Footer';
import Nav from '@components/Navbar';
import Pagecontent from '@components/Pagecontent';
import Button from '@components/Button';
import Form from '@components/Form';
import Input from '@components/Form/input';

class Landing extends Component {
  state = {
    showForm: false,
    hidePageContent: false,
    signupForm: true,
    slideDelay: false,
    formInfo: {
      firstName: '',
      lastName: '',
      recoveryEmail: '',
      username: '',
      password: '',
      logEmail: '',
      logPassword: '',
    },
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
    console.log();
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
    const { showForm, slideDelay, signupForm, formInfo } = this.state;
    const {
      firstName,
      lastName,
      recoveryEmail,
      password,
      username,
      logEmail,
      logPassword,
    } = formInfo;
    return (
      <div className="bg-color landing-page">
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
                <div onClick={() => this.setState({ showForm: false })} className="cut icon"></div>
                <Form>
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
                    classes="passwrd "
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <Button classes="">LOGIN</Button>
                </Form>
                <Form signup={true}>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                    type="text"
                    pattern="^[\w]{3,20}$"
                    placeholder="Enter First name"
                    classes="fname"
                    title="name must contain 3 to 20 characters"
                  />
                  <Input
                    id="lastName"
                    value={lastName}
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
                    id="recoveryEmail"
                    value={recoveryEmail}
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
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <Button classes="">SIGN UP NOW</Button>
                </Form>

                <div className={`slider ${signupForm ? 'moveright' : 'moveleft'}`}>
                  <h2 className="welcome">Welcome to Epic mail</h2>
                  <div className="bg-vector"></div>
                  <div className="logHere">
                    <h3> {!signupForm ? 'Not a member?' : 'Already a member'} </h3>
                    <Button isSubmitting={slideDelay} onClick={this.switchForms} className="regbtn">
                      {!signupForm ? 'Click here to register' : 'Click here to login'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {showForm || <Footer />}
        </div>
      </div>
    );
  }
}

export default Landing;
