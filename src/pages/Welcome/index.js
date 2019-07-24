import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@components/Button';
import './Welcome.scss';
import { toastAction } from '@actions/Toast';
import { updateAction } from '@actions/Profile';

class Welcome extends Component {
  state = {
    isError: true,
    isLoading: false,
    btnType: 'Skip',
    showSave: false,
    pictureFile: '',
    user: null,
    imgSrc: 'https://i.imgur.com/wtjaVfi.png',
  };

  componentDidUpdate() {
    const {
      isError, message, isCompleted, setToast,
    } = this.props;
    if (isCompleted) {
      const status = isError ? 'danger' : 'success';
      setToast({
        status,
        message,
        time: 3000,
      });
    }
  }

  handleChange = (event) => {
    this.setState({ showSave: true });
    const [pictureFile] = event.target.files;
    this.setState({ pictureFile });
    this.loadFilePath(pictureFile);
  };

  handleSave = async () => {
    const {
      updateUser,
    } = this.props;
    await updateUser({ pictureFile: this.state.pictureFile });
  }

  loadFilePath = async (file) => {
    const readPath = new FileReader();
    readPath.readAsDataURL(file);
    readPath.onload = e => this.setState({ imgSrc: e.target.result, btnType: 'Save' });
  };


  render() {
    const {
      imgSrc, showSave,
    } = this.state;
    const {
      history,
      isCompleted,
      isLoading,
      user,
    } = this.props;
    const firstname = user && user.firstname;
    const lastname = user && user.lastname;
    return (
      <div className="welcomePage">
        <div className="backgnd">
          <svg width="500" height="291" viewBox="0 0 545 291" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M539.64 6.59729C539.64 58.5524 556.587 333.916 530.211 285.264C352.924 10.9313 77.5 157 0 0C122.102 0 148.947 0.000205648 288.493 0.000205648C428.039 0.000205648 519.165 5.8651e-05 539.64 6.59729Z" fill="#3526AA" fillOpacity="0.75" />
          </svg>
        </div>
        <div className="welcome">
          <div className="wrapper">
            <p className="info">
              Welcome
              {' '}
              { firstname }
              {' '}
              { lastname }
            </p>
            <Button
              classes="custombtn icon"
              isSubmitting={isLoading}
              onClick={() => history.push('/inbox')}
            >
              {isCompleted ? 'Go' : 'Skip'}
            </Button>
            <div className="upload">
              <img src={imgSrc} alt="profilePic" className="profilepic" />
              <label htmlFor="welcomeUpload" className="addPhoto icon" />
              <input
                id="welcomeUpload"
                type="file"
                onChange={this.handleChange}
                name="file"
                className=""
                accept="image/*"
                data-max-size="2000"
              />
            </div>

            <div className="name">Upload a profile picture</div>
            {
             showSave
               ? (
                 <Button
                   classes="savebtn icon"
                   isSubmitting={isLoading}
                   onClick={this.handleSave}
                 >
                   Save
                 </Button>
               )
               : ''
           }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  isLoading: state.profileReducer.isLoading,
  isError: state.profileReducer.isError,
  isCompleted: state.profileReducer.isCompleted,
  message: state.profileReducer.message,
});

const mapDispatchToProps = {
  updateUser: updateAction.updateUser,
  setToast: toastAction.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
