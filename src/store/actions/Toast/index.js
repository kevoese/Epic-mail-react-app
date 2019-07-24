export const showToast = ({ status, message }) => ({
  type: 'SHOW',
  payload: {
    message,
    status,
    showToast: true,
  },
});

export const noToast = () => ({
  type: 'NONE',
  payload: {
    showToast: false,
  },
});

export const toastAction = {
  setToast: payload => async (dispatch) => {
    const time = payload.time || 3000;
    dispatch(showToast(payload));
    setTimeout(() => {
      dispatch(noToast());
    }, time);
  },
};
