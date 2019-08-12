import { axiosCall } from '@utils/axiosConfig';

export const inboxPending = () => ({
  type: 'INBOX_START',
  payload: {
    isLoading: true,
    isCompleted: false,
  },
});

export const inboxSuccess = data => ({
  type: 'INBOX_SUCCESS',
  payload: {
    isLoading: false,
    isError: false,
    isCompleted: true,
    errror: null,
    ...data,
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


export const getInboxAction = ({ type }) => async (dispatch) => {
  try {
    await dispatch(inboxPending());
    let res;
    switch (type) {
      case 'read':
        res = await axiosCall({ path: 'messages/read', method: 'get' });
        break;
      case 'unread':
        res = await axiosCall({ path: 'messages/unread', method: 'get' });
        break;
      default:
        res = await axiosCall({ path: 'messages', method: 'get' });
        break;
    }
    const messages = res && res.data;
    dispatch(inboxSuccess({ messages, type }));
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
