const INITIAL_STATE = {
  token: null,
  user: {},
  isLoggedIn: false,
  isStarting: true,
};

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['REMOVE_USER', 'SET_USER'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default authReducer;
