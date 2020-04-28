import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { IAction, Dependencies } from '../../common/base-types';
import { ApiClient } from '../../common/modules/xhr';
import { IBaseConfig } from '../../common/utilities/create-config';
import { sessionMiddleware } from '../middlewares/session-middleware';
import { createRootReducer, rootEpic, IApplicationStore } from './index';

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
  const middlewares = [sessionMiddleware, routerMiddleware(history), epicMiddleware];
  let storeCreator = compose(applyMiddleware(...middlewares));

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
