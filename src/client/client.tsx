import { CssBaseline } from '@material-ui/core';
import { jssPreset, MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { create } from 'jss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { init as initServiceError } from './common/modules/service-error';
import { client, init as initApiClient } from './common/modules/xhr';
import config from './config';
import { App } from './containers/app';
import setupRootStore, { history } from './state/root-store/setup-root-store';
import { GlobalStyles, theme } from './theme';

const store = setupRootStore({ client, config });
const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins],
  insertionPoint: 'jss-insertion-point',
});

initServiceError(store);
initApiClient(store);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <StylesProvider jss={jss}>
            <CssBaseline />
            <GlobalStyles />
            <App />
          </StylesProvider>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
};

renderApp();
