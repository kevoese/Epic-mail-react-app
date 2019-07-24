const INITIAL_STATE = {
  status: 'success',
  showToast: false,
  message: null,
};

const toastReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SHOW':
      return {
        ...state,
        ...payload,
      };
    case 'NONE':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default toastReducer;
