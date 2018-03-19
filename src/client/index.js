import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

import 'normalize.css';
import styles from './scss/application.scss';

render(
  <App />,
  document.getElementById('root')
);