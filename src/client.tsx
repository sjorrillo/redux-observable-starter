import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { client } from './common/modules/api-client';
import config from './config';
import { App } from './containers/app';
import setupRootStore, { history } from './state/root-store/setup-root-store';
import { GlobalStyles, theme } from './theme';

const store = setupRootStore({ client, config });

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
};

renderApp();
