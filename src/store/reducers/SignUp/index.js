const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isSuccess: false,
  isError: false,
  message: null,
};

const signUpReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['SIGNUP_START', 'SIGNUP_SUCCESS', 'SIGNUP_ERROR', 'CLEAN_UP'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default signUpReducer;
