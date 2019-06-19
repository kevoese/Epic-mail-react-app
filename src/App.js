import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Landing from './pages/Landing';
import './styles/App.scss';

const App = () => (
  <Fragment>
    <Landing />
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));
