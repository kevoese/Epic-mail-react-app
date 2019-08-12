const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isError: false,
  error: null,
  messages: [],
};

const draftReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['DRAFT_START', 'DRAFT_SUCCESS', 'DRAFT_FAILURE', 'CLEAN_UP'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default draftReducer;
