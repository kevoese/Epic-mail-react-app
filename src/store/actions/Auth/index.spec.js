import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setUser, removeUser, setUserAction,
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

describe('Auth Actions', () => {
  describe('actions', () => {
    const initialState = {
      token: null,
      user: {},
      isLoggedIn: false,
      isStarting: true,
    };

    test('setUser should return type SET_USER', () => {
      const payload = ({ user, token });
      const setAction = setUser(payload);

      expect(setAction).toEqual({
        type: 'SET_USER',
        payload: {
          ...initialState,
          user,
          token,
          isLoggedIn: undefined,
          isStarting: false,
        },
      });
    });

    test('removeUser should return type REMOVE_USER', () => {
      const removeAction = removeUser();

      expect(removeAction).toEqual({
        type: 'REMOVE_USER',
        payload: {
          token: null,
          user: null,
          isLoggedIn: false,
        },
      });
    });
  });

  describe('Auth Action', () => {
    let store;
    beforeEach(() => {
      store = mockStore({
        token: null,
        user: {},
        isLoggedIn: false,
        isStarting: true,
      });
    });

    afterEach(() => {
      store.clearActions();
      localStorage.clear();
    });

    test('should call setUserAction', async () => {
      const expectedActions = ['SET_USER'];
      await store.dispatch(setUserAction({ user, token }));
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });
  });
});
