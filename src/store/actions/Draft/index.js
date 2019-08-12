import { axiosCall } from '@utils/axiosConfig';

export const draftPending = () => ({
  type: 'DRAFT_START',
  payload: {
    isLoading: true,
    isCompleted: false,
  },
});

export const draftSuccess = messages => ({
  type: 'DRAFT_SUCCESS',
  payload: {
    isLoading: false,
    isError: false,
    isCompleted: true,
    errror: null,
    messages,
  },
});

export const draftFailure = error => ({
  type: 'DRAFT_FAILURE',
  payload: {
    isLoading: false,
    user: null,
    isError: true,
    isCompleted: true,
    error,
  },
});


export const getdraftAction = () => async (dispatch) => {
  try {
    await dispatch(draftPending());
    const res = await axiosCall({ path: 'messages/draft', method: 'get' });
    let messages = res && res.data;

    if (!Array.isArray(messages)) messages = null;

    dispatch(draftSuccess(messages));
  } catch ({ response, message }) {
    /* istanbul ignore next */
    if (response) {
      await dispatch(draftFailure(response.data.error));
      return;
    }
    /* istanbul ignore next */
    await dispatch(draftFailure(message));
  }
};
