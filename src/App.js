import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Switch, withRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Inbox from '@pages/Inbox';
import Landing from '@pages/Landing';
import store from './store';
import './styles/App.scss';

const App = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/inbox" component={Inbox} />
    </Switch>
  </Fragment>
);

const AppWithRouter = withRouter(App);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
