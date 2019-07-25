import { createStore } from 'redux';

// eslint-disable-next-line no-unused-vars
const reducer = (state = {}, action) => {
	return state;
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;