import { axiosCall } from '@utils/axiosConfig';
import { saveUser } from '@actions/Auth';

export const startRegister = () => ({
  type: 'SIGNUP_START',
  payload: {
    isLoading: true,
    isCompleted: false,
    isSuccess: false,
    isError: false,
  },
});

export const signUpClean = () => ({
  type: 'CLEAN_UP',
  payload: {
    isLoading: false,
    isCompleted: false,
    isSuccess: false,
    isError: false,
    message: null,
  },
});

export const registerFailure = error => ({
  type: 'SIGNUP_ERROR',
  payload: {
    isLoading: false,
    isCompleted: false,
    isSuccess: false,
    isError: true,
    message: error,
  },
});

export const registerSuccess = () => ({
  type: 'SIGNUP_SUCCESS',
  payload: {
    isLoading: false,
    isCompleted: true,
    isSuccess: true,
    isError: false,
    message: 'Regisration Successful',
  },
});

export const registerAction = {
  registerUser: signUpData => async (dispatch) => {
    dispatch(startRegister());
    try {
      const res = await axiosCall({ path: 'auth/signup', method: 'post', payload: signUpData });
      const userData = res && res.data;
      await dispatch(registerSuccess());
      dispatch(saveUser(userData));
    } catch ({ response, message }) {
      if (response) {
        await dispatch(registerFailure(response.data.error));
        return;
      }
      await dispatch(registerFailure(message));
    }
  },
  cleanUp: () => async (dispatch) => {
    await dispatch(signUpClean());
  },
};
