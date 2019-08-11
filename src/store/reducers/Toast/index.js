const INITIAL_STATE = {
  status: 'success',
  showToast: false,
  message: null,
};

const toastReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['SHOW', 'NONE'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default toastReducer;
