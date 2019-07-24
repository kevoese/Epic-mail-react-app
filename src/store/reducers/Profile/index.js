const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  isError: false,
  message: null,
  user: null,
};

const profileReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'UPDATE_START':
      return {
        ...state,
        ...payload,
      };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        ...payload,
      };
    case 'UPDATE_FAILURE':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
