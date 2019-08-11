import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import { axiosCall } from '@utils/axiosConfig';
import {
  startRegister, signUpClean, registerFailure, registerSuccess, registerAction,
} from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const user = {
  firstName: 'frank',
  lastName: 'angle',
  username: 'agnfr',
  email: 'frank@me.com',
  password: '12345678',
};
const token = 'randomtokenstring';
jest.mock('@utils/axiosConfig');

describe('Sign up Actions', () => {
  describe('actions', () => {
    const initialState = {
      isLoading: false,
      isCompleted: false,
      isSuccess: false,
      isError: false,
      message: null,
    };

    test('registerFailure should return type SIGNUP_ERROR', () => {
      const payload = 'some errors';
      const registerFailureAction = registerFailure(payload);

      expect(registerFailureAction).toEqual({
        type: 'SIGNUP_ERROR',
        payload: {
          ...initialState,
          isError: true,
          isCompleted: true,
          message: payload,
        },
      });
    });

    test('registerSuccess should return type SIGNUP_SUCCESS', () => {
      const registerSuccessAction = registerSuccess();

      expect(registerSuccessAction).toEqual({
        type: 'SIGNUP_SUCCESS',
        payload: {
          ...initialState,
          isCompleted: true,
          isSuccess: true,
          isError: false,
          message: 'Registration Successful',
        },
      });
    });

    test('startRegister should return type SIGNUP_START', () => {
      const startRegisterAction = startRegister();

      expect(startRegisterAction).toEqual({
        type: 'SIGNUP_START',
        payload: {
          ...initialState,
          isLoading: true,
          isCompleted: false,
          isSuccess: false,
          isError: false,
          message: undefined,
        },
      });
    });

    test('signUpClean should return type CLEAN_UP', () => {
      const signUpCleanAction = signUpClean();

      expect(signUpCleanAction).toEqual({
        type: 'CLEAN_UP',
        payload: {
          ...initialState,
        },
      });
    });
  });

  describe('Auth Action', () => {
    let store;
    beforeEach(() => {
      moxios.install(axios);
      store = mockStore({
        isLoading: false,
        isCompleted: false,
        isSuccess: false,
        isError: false,
        message: null,
      });
    });

    afterEach(() => {
      moxios.uninstall(axios);
      store.clearActions();
      localStorage.clear();
    });

    test('should sign up user and call sign up actions', async () => {
      const expectedActions = ['SIGNUP_START', 'SIGNUP_SUCCESS', 'SET_USER'];
      axiosCall.mockResolvedValue({
        data: {
          Token: token,
          user: { ...user },
        },
      });
      await store.dispatch(registerAction.registerUser(user));
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });

    test('should throw sign up error if response does not contain user details', async () => {
      const expectedActions = ['SIGNUP_START', 'SIGNUP_SUCCESS', 'SIGNUP_ERROR'];
      axiosCall.mockResolvedValue({
        error: {
        },
      });
      await store.dispatch(registerAction.registerUser(user));
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });

    test('should call clean up action', async () => {
      const expectedActions = ['CLEAN_UP'];
      await store.dispatch(registerAction.cleanUp());
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });
  });
});
