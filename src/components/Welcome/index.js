/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-tabs */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Button from '@components/Button';
import './Welcome.scss';
import axios from 'axios';

class Welcome extends Component {
  state = {
    isError: true,
    isSubmitting: false,
    btnType: 'Skip',
    pictureFile: '',
    user: JSON.parse(localStorage.getItem('user')) || '',
    imgSrc: 'images/userprofile.png',
  };

  getImgLink = async () => {
    const imgForm = new FormData();
    imgForm.append('image', this.state.pictureFile);
    imgForm.append('name', this.state.pictureFile.name);
    const imgurApiUrl = 'https://api.imgur.com/3/image';
    const app = 'https://epicmailappbykelvin.herokuapp.com/api/v2/';
    // const appLocal = 'http://localhost:3000/api/v2/';
    this.setState({ isSubmitting: true });
    try {
      const response = await axios.post(imgurApiUrl, imgForm, {
        headers: { Authorization: 'Client-ID 163ceaad1d6ed26' },
      });
      const profileResponse = await axios.put(
        `${app}user/update`,
        { profilePic: response.data.data.link },
        {
          headers: { token: localStorage.getItem('token') },
        },
      );

      const imgLink = profileResponse.data.data.profile_pic;
      this.setState({
        user: {
          ...this.state.user,
          profile_pic: imgLink,
        },
        imgSrc: imgLink,
        btnType: 'Go',
      });
      this.setState({ imgSrc: response.data.data.link });
      this.setState({ btnType: 'Go' });
    } catch (err) {
      this.setState({ isError: true });
    }
    this.setState({
      isSubmitting: false,
    });
  };

  // saveUserImg = async () => {
  // 	const app = 'https://epicmailappbykelvin.herokuapp.com/api/v2/';
  // 	const appLocal = 'http://localhost:3000/api/v2/';
  // 	console.log('here');
  // 	if (this.state.btnType === 'Go') {
  // 	this.setState({isSubmitting: true});
  // 		try {
  // 			const profileResponse = await axios.put(
  // 				`${appLocal}user/update`,
  // 				{profilePic: this.state.imgSrc},
  // 				{
  // 					headers: {token: localStorage.getItem('token')},
  // 				}
  // 			);
  // 			console.log('response from db', profileResponse.data);
  // 			const imgLink = profileResponse.data.data.profile_pic;
  // 			this.setState({
  // 				user: {
  // 					...this.state.user,
  // 					profile_pic: imgLink,
  //         },
  //        imgSrc: imgLink
  // 			});
  // 		} catch (err) {
  // 			console.log('errors oo', err);
  // 		}
  // 		this.setState({
  // 			isSubmitting: false,
  // 			btnType: 'Skip',
  // 		});
  // 	}
  // };

  loadFilePath = async (file) => {
    const readPath = new FileReader();
    readPath.readAsDataURL(file);
    readPath.onload = e => this.setState({ imgSrc: e.target.result, btnType: 'Save' });
  };

  handleChange = (event) => {
    this.setState({ isError: false });
    const [pictureFile] = event.target.files;
    this.setState({ pictureFile });
    this.loadFilePath(pictureFile);
  };

  render() {
    const {
      isError, isSubmitting, btnType, imgSrc, user,
    } = this.state;
    const { history } = this.props;
    return (
      <div className="welcome">
        <div className="wrapper">
          <Button
            classes="btn icon"
            isSubmitting={isSubmitting}
            onClick={btnType === 'Save' ? this.getImgLink : () => history.push('/inbox')}
          >
            {btnType}
          </Button>

          <img src={imgSrc} className="profilepic" />
          <div className="name">Upload a profile picture</div>
          <label htmlFor="welcomeUpload" className="addPhoto icon">
            Change photo
          </label>
          <input
            id="welcomeUpload"
            type="file"
            onChange={this.handleChange}
            name="file"
            className=""
            accept="image/*"
            data-max-size="2000"
          />
          <div className="loading hide" />
          {isError && <p className="error icon">Problem uploading profile picture</p>}
          <p className="info">
            Welcome to Epicmail
            {' '}
            {user.firstname}
            {' '}
            {user.lastname}
          </p>
        </div>
      </div>
    );
  }
}

export default Welcome;
