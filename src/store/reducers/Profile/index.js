const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isError: false,
  message: null,
  user: null,
};

const profileReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['UPDATE_START', 'UPDATE_SUCCESS', 'UPDATE_FAILURE', 'CLEAN_UP'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default profileReducer;
