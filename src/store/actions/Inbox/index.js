import { axiosCall } from '@utils/axiosConfig';

export const inboxPending = () => ({
  type: 'INBOX_START',
  payload: {
    isLoading: true,
    isCompleted: false,
  },
});

export const inboxSuccess = messages => ({
  type: 'INBOX_SUCCESS',
  payload: {
    isLoading: false,
    isError: false,
    isCompleted: true,
    errror: null,
    messages,
  },
});

export const inboxFailure = error => ({
  type: 'INBOX_FAILURE',
  payload: {
    isLoading: false,
    user: null,
    isError: true,
    isCompleted: true,
    error,
  },
});


export const getInboxAction = () => async (dispatch) => {
  try {
    await dispatch(inboxPending());
    const res = await axiosCall({ path: 'messages', method: 'get' });
    const messages = res && res.data;

    dispatch(inboxSuccess(messages));
  } catch ({ response, message }) {
    /* istanbul ignore next */
    if (response) {
      await dispatch(inboxFailure(response.data.error));
      return;
    }
    /* istanbul ignore next */
    await dispatch(inboxFailure(message));
  }
};
