const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isError: false,
  error: null,
  messages: [],
};

const sentReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['SENT_START', 'SENT_SUCCESS', 'SENT_FAILURE', 'CLEAN_UP'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default sentReducer;
