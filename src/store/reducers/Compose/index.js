const INITIAL_STATE = {
  isLoading: false,
  isCompleted: false,
  error: null,
  message: null,
};

const composeReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (['COMPOSE_START', 'COMPOSE_SUCCESS', 'COMPOSE_FAILURE'].includes(type)) {
    return {
      ...state,
      ...payload,
    };
  } return state;
};

export default composeReducer;
