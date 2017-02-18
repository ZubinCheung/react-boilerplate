import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';
import hello from './routes/hello';

import './index.css';


render(
  <Router history={browserHistory}>
    <Route path="/" component={hello} />
  </Router>,
  document.getElementById('root'),
);
