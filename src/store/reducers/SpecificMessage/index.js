const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isError: false,
  error: null,
  messages: null,
};

const specificMsgReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['SPECIFIC_MSG_START', 'SPECIFIC_MSG_SUCCESS', 'SPECIFIC_MSG_FAILURE', 'CLEAN_UP'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default specificMsgReducer;
