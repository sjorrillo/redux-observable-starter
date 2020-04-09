// import { orange } from '@material-ui/core/colors';
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { client } from './common/modules/api-client';
import config from './config';
import { App } from './containers/app';
import setupRootStore, { history } from './state/root-store/setup-root-store';

const store = setupRootStore({ client, config });

// const theme = createMuiTheme(null, {
//   status: {
//     danger: orange[500],
//   },
// });

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <ThemeProvider theme={theme}> */}
        <App />
        {/* </ThemeProvider> */}
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
};

renderApp();
