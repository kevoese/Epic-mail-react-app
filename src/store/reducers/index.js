import { combineReducers } from 'redux';
import signUpReducer from '@reducers/SignUp';
import signInReducer from '@reducers/SignIn';
import toastReducer from '@reducers/Toast';
import authReducer from '@reducers/Auth';
import profileReducer from '@reducers/Profile';
import inboxReducer from '@reducers/Inbox';

const reducers = combineReducers({
  signUpReducer,
  signInReducer,
  toastReducer,
  authReducer,
  profileReducer,
  inboxReducer,
});

export default reducers;
