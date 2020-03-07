import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import config from './config';
import { App } from './containers/app';
import condfigureStore, { history } from './state/configure-store';

const store = condfigureStore({ preloadedState: {}, config });

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
};

renderApp();
