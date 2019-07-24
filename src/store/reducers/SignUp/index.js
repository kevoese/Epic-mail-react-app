const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isSuccess: false,
  isError: false,
  message: null,
};

const signUpReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SIGNUP_START':
      return {
        ...state,
        ...payload,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        ...payload,
      };
    case 'SIGNUP_ERROR':
      return {
        ...state,
        ...payload,
      };
    case 'CLEAN_UP':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default signUpReducer;
