import { axiosCall } from '@utils/axiosConfig';

const sortData = (messages) => {
  const {
    firstname, lastname, status, ...rest
  } = messages;
  let receiverName;
  let senderName;
  if (status) {
    senderName = 'You';
    receiverName = `${firstname} ${lastname}`;
  } else {
    receiverName = 'You';
    senderName = `${firstname} ${lastname}`;
  }

  return ({
    receiverName, senderName, status, ...rest,
  });
};

export const msgPending = () => ({
  type: 'SPECIFIC_MSG_START',
  payload: {
    isLoading: true,
    isCompleted: false,
  },
});

export const msgSuccess = messages => ({
  type: 'SPECIFIC_MSG_SUCCESS',
  payload: {
    isLoading: false,
    isError: false,
    isCompleted: true,
    errror: null,
    messages,
  },
});

export const msgFailure = error => ({
  type: 'SPECIFIC_MSG_FAILURE',
  payload: {
    isLoading: false,
    user: null,
    isError: true,
    isCompleted: true,
    error,
  },
});


export const viewMsgAction = msgId => async (dispatch) => {
  try {
    const id = msgId.slice(0, msgId.indexOf('_'));
    await dispatch(msgPending());
    const res = await axiosCall({ path: `messages/${id}`, method: 'get' });
    const messages = res && res.data;

    const specificMsg = sortData(messages);
    dispatch(msgSuccess(specificMsg));
  } catch ({ response, message }) {
    /* istanbul ignore next */
    if (response) {
      await dispatch(msgFailure(response.data.error));
      return;
    }
    /* istanbul ignore next */
    console.log(message);
    await dispatch(msgFailure(message));
  }
};
