import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import { axiosCall } from '@utils/axiosConfig';
import {
  startUpdate, updateFailure, updateSuccess, updateAction,
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

jest.mock('@utils/axiosConfig');
jest.mock('@utils/index');

describe.only('Profile Actions', () => {
  describe('actions', () => {
    const initialState = {
      isLoading: false,
      isCompleted: false,
      isError: false,
      message: null,
      user: null,
    };

    test('UpdateFailure should return type UPDATE_FAILURE', () => {
      const payload = 'some errors';
      const updateFailureAction = updateFailure(payload);

      expect(updateFailureAction).toEqual({
        type: 'UPDATE_FAILURE',
        payload: {
          ...initialState,
          isCompleted: true,
          isError: true,
          message: payload,
        },
      });
    });

    test('UpdateSuccess should return type SUPDATE_SUCCESS', () => {
      const updateSuccessAction = updateSuccess(user);

      expect(updateSuccessAction).toEqual({
        type: 'UPDATE_SUCCESS',
        payload: {
          ...initialState,
          user,
          isCompleted: true,
          message: 'Profile Successfully Updated',
        },
      });
    });

    test('startUpdate should return type UPDATE_START', () => {
      const startUpdateAction = startUpdate();

      expect(startUpdateAction).toEqual({
        type: 'UPDATE_START',
        payload: {
          isLoading: true,
          isCompleted: false,
        },
      });
    });
  });

  describe('Profile Action', () => {
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

    test('should update user and call update actions without image', async () => {
      const expectedActions = ['UPDATE_START', 'UPDATE_SUCCESS', 'SET_USER'];
      axiosCall.mockResolvedValue({
        data: {
          user: { ...user },
        },
      });
      await store.dispatch(updateAction.updateUser(user));
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });

    test('should update user and call update actions with image', async () => {
      const expectedActions = ['UPDATE_START', 'UPDATE_SUCCESS', 'SET_USER'];
      axiosCall.mockResolvedValue({
        data: {
          user: { ...user },
        },
      });
      await store.dispatch(updateAction.updateUser({ ...user, pictureFile: 'some string' }));
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });

    // test('should throw update error if response does not contain user details', async () => {
    //   const expectedActions = ['UPDATE_START', 'UPDATE_SUCCESS', 'UPDATE_FAILURE'];
    //   axiosCall.mockResolvedValue({
    //     error: 'error',
    //   });
    //   await store.dispatch(updateAction.updateUser(user));
    //   const dispatchedActions = store.getActions();
    //   const actionTypes = dispatchedActions.map(action => action.type);
    //   expect(actionTypes).toEqual(expectedActions);
    // });

    // test('should call clean up action', async () => {
    //   const expectedActions = ['CLEAN_UP'];
    //   await store.dispatch(updateAction.cleanUp());
    //   const dispatchedActions = store.getActions();
    //   const actionTypes = dispatchedActions.map(action => action.type);
    //   expect(actionTypes).toEqual(expectedActions);
    // });
  });
});
