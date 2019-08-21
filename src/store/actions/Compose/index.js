import { axiosCall } from '@utils/axiosConfig';
import { toastAction } from '@actions/Toast';

export const composePending = () => ({
  type: 'COMPOSE_START',
  payload: {
    isLoading: true,
  },
});

export const composeSuccess = () => ({
  type: 'COMPOSE_SUCCESS',
  payload: {
    isLoading: false,
    errror: null,
    message: 'Message Sent successfully',
  },
});

export const composeFailure = () => ({
  type: 'COMPOSE_FAILURE',
  payload: {
    isLoading: false,
  },
});


export const composeAction = payload => async (dispatch) => {
  try {
    await dispatch(composePending());
    await axiosCall({ path: 'messages', method: 'post', payload });
    dispatch(toastAction.setToast({
      status: 'success',
      message: 'Message sent Successfully',
      time: 3000,
    }));
    dispatch(composeSuccess());
  } catch ({ response, message }) {
    /* istanbul ignore next */
    if (response) {
      await dispatch(composeFailure(response.data.error));
      dispatch(toastAction.setToast({
        status: 'danger',
        message: response.data.error,
        time: 3000,
      }));
      return;
    }
    /* istanbul ignore next */
    await dispatch(composeFailure(message));
    dispatch(toastAction.setToast({
      status: 'danger',
      message,
      time: 3000,
    }));
  }
};
