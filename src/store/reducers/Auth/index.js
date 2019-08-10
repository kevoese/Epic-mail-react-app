const INITIAL_STATE = {
  token: localStorage.token || null,
  user: (localStorage.user && localStorage.user !== 'undefined' && JSON.parse(localStorage.user)) || null,
  isLoggedIn: localStorage.token || false,
};

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SAVE_USER':
      return {
        ...state,
        ...payload,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default authReducer;
