import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import { axiosCall } from '@utils/axiosConfig';
import {
  startLogin, signInClean, loginFailure, loginSuccess, loginAction,
} from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const user = {
  email: 'frank@me.com',
  password: '12345678',
};
const token = 'randomtokenstring';
jest.mock('@utils/axiosConfig');

describe('Sign In Actions', () => {
  describe('actions', () => {
    const initialState = {
      isLoading: false,
      isCompleted: false,
      isSuccess: false,
      isError: false,
      message: null,
    };

    test('LoginFailure should return type SIGNIN_ERROR', () => {
      const payload = 'some errors';
      const LoginFailureAction = loginFailure(payload);

      expect(LoginFailureAction).toEqual({
        type: 'SIGNIN_ERROR',
        payload: {
          ...initialState,
          isCompleted: true,
          isError: true,
          message: payload,
        },
      });
    });

    test('loginSuccess should return type SIGNIN_SUCCESS', () => {
      const loginSuccessAction = loginSuccess();

      expect(loginSuccessAction).toEqual({
        type: 'SIGNIN_SUCCESS',
        payload: {
          ...initialState,
          isCompleted: true,
          isSuccess: true,
          isError: false,
          message: 'Login Successful',
        },
      });
    });

    test('startLogin should return type SIGNIN_START', () => {
      const startloginAction = startLogin();

      expect(startloginAction).toEqual({
        type: 'SIGNIN_START',
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

    test('signInClean should return type CLEAN_UP', () => {
      const signInCleanAction = signInClean();

      expect(signInCleanAction).toEqual({
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
      const expectedActions = ['SIGNIN_START', 'SIGNIN_SUCCESS', 'SET_USER'];
      axiosCall.mockResolvedValue({
        data: {
          Token: token,
          user: { ...user },
        },
      });
      await store.dispatch(loginAction.loginUser(user));
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });

    test('should throw sign up error if response does not contain user details', async () => {
      const expectedActions = ['SIGNIN_START', 'SIGNIN_SUCCESS', 'SIGNIN_ERROR'];
      axiosCall.mockResolvedValue({
        error: {
        },
      });
      await store.dispatch(loginAction.loginUser(user));
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });

    test('should call clean up action', async () => {
      const expectedActions = ['CLEAN_UP'];
      await store.dispatch(loginAction.cleanUp());
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });
  });
});
