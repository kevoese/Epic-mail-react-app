import axiosDefault from 'axios';

/* istanbul ignore next */
export const axiosCall = async ({
  path, payload, method,
}) => {
  const app = 'https://epicmailappbykelvin.herokuapp.com/api/v2/';
  // const app = 'http://localhost:3000/api/v2/';
  const url = app + path;
  const token = localStorage.getItem('token');
  const axiosdata = {
    method,
    url,
    data: payload,
    headers: {
      token,
      'Content-Type': 'application/json',
    },
    json: true,
  };
  const result = await axiosDefault(axiosdata);

  const data = result && result.data;
  return data;
};

export const axios = axiosDefault;
