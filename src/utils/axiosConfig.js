import axiosDefault from 'axios';

export const axiosCall = async ({
  path, payload, method,
}) => {
  const app = 'https://epicmailappbykelvin.herokuapp.com/api/v2/';
  // const app = 'http://localhost:3000/api/v2/';
  const url = app + path;
  const result = await axiosDefault[method](url, payload, { headers: { token: localStorage.getItem('token') } });

  const data = result && result.data;
  return data;
};

export const axios = axiosDefault;
