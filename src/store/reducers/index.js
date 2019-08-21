import { combineReducers } from 'redux';
import signUpReducer from '@reducers/SignUp';
import signInReducer from '@reducers/SignIn';
import toastReducer from '@reducers/Toast';
import authReducer from '@reducers/Auth';
import profileReducer from '@reducers/Profile';
import inboxReducer from '@reducers/Inbox';
import sentReducer from '@reducers/Sent';
import draftReducer from '@reducers/Draft';
import specificMsgReducer from '@reducers/SpecificMessage';
import composeReducer from '@reducers/Compose';

const reducers = combineReducers({
  signUpReducer,
  signInReducer,
  toastReducer,
  authReducer,
  composeReducer,
  profileReducer,
  inboxReducer,
  sentReducer,
  draftReducer,
  specificMsgReducer,
});

export default reducers;
