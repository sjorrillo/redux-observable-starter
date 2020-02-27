import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import config from './config';
import { App } from './containers/root';
import { condfigureStore } from './state/configure-store';

const store = condfigureStore();
console.log(config);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
};

renderApp();
