import { axiosCall } from '@utils/axiosConfig';
import { saveUser } from '@actions/Auth';

export const startLogin = () => ({
  type: 'SIGNIN_START',
  payload: {
    isLoading: true,
    isCompleted: false,
    isSuccess: false,
    isError: false,
  },
});


export const signInClean = () => ({
  type: 'CLEAN_UP',
  payload: {
    isLoading: false,
    isCompleted: false,
    isSuccess: false,
    isError: false,
    message: null,
  },
});


export const loginFailure = error => ({
  type: 'SIGNIN_ERROR',
  payload: {
    isLoading: false,
    isCompleted: true,
    isSuccess: false,
    isError: true,
    message: error,
  },
});

export const loginSuccess = () => ({
  type: 'SIGNIN_SUCCESS',
  payload: {
    isLoading: false,
    isCompleted: true,
    isSuccess: true,
    isError: false,
    message: 'Login successful',
  },
});

export const loginAction = {
  loginUser: signUpData => async (dispatch) => {
    dispatch(startLogin());
    try {
      const res = await axiosCall({ path: 'auth/login', method: 'post', payload: signUpData });
      const userData = res && res.data;
      dispatch(loginSuccess());
      dispatch(saveUser(userData));
    } catch ({ response, message }) {
      if (response) {
        dispatch(loginFailure(response.data.error));
        return;
      }
      dispatch(loginFailure(message));
    }
  },
  cleanUp: () => async (dispatch) => {
    dispatch(signInClean());
  },
};
