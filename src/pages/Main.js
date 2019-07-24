import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Inbox from '@pages/Inbox';
import Welcome from '@pages/Welcome';
import Toast from '@components/Toast';
import Access from '@pages/Access';
import Nav from '@components/mainNav';
import Landing from '@pages/Landing';

const Main = ({ history }) => (
  <div>
    <Nav history={history} pathname={history.location.pathname} />
    <Toast />
    <Switch>
      <Route path="/welcome" component={Welcome} />
      <Route path="/signup" component={Access} />
      <Route exact path="/" component={Landing} />
      <Route path="/inbox" component={Inbox} />
    </Switch>
  </div>
);

export default withRouter(Main);
