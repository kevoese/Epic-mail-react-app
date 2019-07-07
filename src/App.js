import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Landing from '@pages/Landing';
import Welcome from '@components/Welcome';
// import Inbox from '@pages/Inbox';
import './styles/App.scss';

const App = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/welcome" component={Welcome} />
      </Switch>
    </BrowserRouter>
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));
