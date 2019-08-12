const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isError: false,
  error: null,
  type: 'all',
  messages: [],
};

const inboxReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['INBOX_START', 'INBOX_SUCCESS', 'INBOX_FAILURE', 'CLEAN_UP'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default inboxReducer;
