import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import store from './redux';
import * as serviceWorker from './serviceWorker';

WebFont.load({
  google: {
    families: ['Baloo Tamma 2:500&display=swap'],
  },
  classes: false,
  events: false,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
