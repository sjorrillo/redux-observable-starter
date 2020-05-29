import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { Dependencies, IAction } from '../../common/base-types';
import { ApiClient } from '../../common/modules/xhr';
import { IBaseConfig } from '../../common/utilities/create-config';
import { createRootReducer, IApplicationStore, rootEpic } from './index';

interface IConfigureStoreProps {
  client: ApiClient;
  config: IBaseConfig;
}

export const history = createBrowserHistory();

let _store;
export const getStore = (client?: ApiClient): Store<IApplicationStore> => {
  if (_store) return _store;

  const preloadedState = {}; // TODO: preload state from localstorage

  const epicMiddleware = createEpicMiddleware<IAction, IAction, IApplicationStore, Dependencies>({
    dependencies: {
      client,
    },
  });
  const middlewares = [routerMiddleware(history), epicMiddleware];
  if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger').createLogger;
    const logger = createLogger({
      collapsed: true,
      // Added diff and state transform to add more debug functionality and stop redux-logger from hanging
      // diff: true, // show diff in console
      // stateTransformer: (state) => state.mutate, // select slice of state object to speed up debug
    });
    middlewares.push(logger);
  }
  const storeCreator = compose(applyMiddleware(...middlewares));

  const basicStore = storeCreator(createStore);
  _store = basicStore(createRootReducer(history), preloadedState);
  epicMiddleware.run(rootEpic);

  return _store;
};

export default function setupRootStore({ client, config }: IConfigureStoreProps) {
  const store = getStore(client);

  if (config.isDevelopment) {
    // just publish it globally to easily
    // inspect the current state of the store
    window.__reduxStore = store;
  }

  return store;
}
