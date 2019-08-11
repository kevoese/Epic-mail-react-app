

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

export const setUser = ({ user, token }) => ({
  type: 'SET_USER',
  payload: {
    token: token || localStorage.token,
    user,
    isLoggedIn: token && true,
    isStarting: false,
  },
});

export const setUserAction = () => (dispatch) => {
  /* istanbul ignore next */
  const user = (localStorage.user && localStorage.user !== 'undefined' && JSON.parse(localStorage.user)) || null;
  const token = localStorage.token || null;
  dispatch(setUser({ user, token }));
};

export const saveUser = (userData) => {
  if (userData.Token) localStorage.setItem('token', userData.Token);
  localStorage.setItem('user', JSON.stringify(userData.user));
};
