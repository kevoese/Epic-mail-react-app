import { axiosCall } from '@utils/axiosConfig';

export const sentPending = () => ({
  type: 'SENT_START',
  payload: {
    isLoading: true,
    isCompleted: false,
  },
});

export const sentSuccess = messages => ({
  type: 'SENT_SUCCESS',
  payload: {
    isLoading: false,
    isError: false,
    isCompleted: true,
    errror: null,
    messages,
  },
});

export const sentFailure = error => ({
  type: 'SENT_FAILURE',
  payload: {
    isLoading: false,
    user: null,
    isError: true,
    isCompleted: true,
    error,
  },
});


export const getsentAction = () => async (dispatch) => {
  try {
    await dispatch(sentPending());
    const res = await axiosCall({ path: 'messages/sent', method: 'get' });
    const messages = res && res.data;

    dispatch(sentSuccess(messages));
  } catch ({ response, message }) {
    /* istanbul ignore next */
    if (response) {
      await dispatch(sentFailure(response.data.error));
      return;
    }
    /* istanbul ignore next */
    await dispatch(sentFailure(message));
  }
};
