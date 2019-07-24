export const saveUser = (userData) => {
  localStorage.setItem('token', userData.Token);
  localStorage.setItem('user', JSON.stringify(userData.user));
  return ({
    type: 'SAVE_USER',
    payload: {
      token: userData.Token,
      user: userData.user,
      isLoggedIn: true,
    },
  });
};

export const removeUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return ({
    type: 'REMOVE_USER',
    payload: {
      token: null,
      user: null,
      isLoggedIn: false,
    },
  });
};
