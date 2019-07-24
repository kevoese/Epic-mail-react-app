const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isSuccess: false,
  isError: false,
  message: null,
};

const signInReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SIGNIN_START':
      return {
        ...state,
        ...payload,
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        ...payload,
      };
    case 'SIGNIN_ERROR':
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

export default signInReducer;
