import { combineReducers } from 'redux';
import signUpReducer from '@reducers/SignUp';
import signInReducer from '@reducers/SignIn';
import toastReducer from '@reducers/Toast';
import authReducer from '@reducers/Auth';
import profileReducer from '@reducers/Profile';
import inboxReducer from '@reducers/Inbox';
import sentReducer from '@reducers/Sent';
import draftReducer from '@reducers/Draft';

const reducers = combineReducers({
  signUpReducer,
  signInReducer,
  toastReducer,
  authReducer,
  profileReducer,
  inboxReducer,
  sentReducer,
  draftReducer,
});

export default reducers;
