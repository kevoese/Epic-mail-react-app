const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isSuccess: false,
  isError: false,
  message: null,
};

const signInReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['SIGNIN_START', 'SIGNIN_SUCCESS', 'SIGNIN_ERROR', 'CLEAN_UP'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default signInReducer;
