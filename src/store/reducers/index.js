import { combineReducers } from 'redux';
import signUpReducer from '@reducers/SignUp';
import signInReducer from '@reducers/SignIn';
import toastReducer from '@reducers/Toast';
import authReducer from '@reducers/Auth';
import profileReducer from '@reducers/Profile';

const reducers = combineReducers({
  signUpReducer,
  signInReducer,
  toastReducer,
  authReducer,
  profileReducer,
});

export default reducers;
