import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { IBaseConfig } from '../common/utilities/create-config';
import { createRootReducer, rootEpic, IApplicationStore } from './root';

interface IConfigureStoreProps {
  preloadedState: IApplicationStore;
  config: IBaseConfig;
}

export const history = createBrowserHistory();

export default function condfigureStore({ preloadedState, config }: IConfigureStoreProps) {
  const epicMiddleware = createEpicMiddleware();
  let storeCreator = compose(applyMiddleware(routerMiddleware(history), epicMiddleware));

  const basicStore = storeCreator(createStore);
  const store = basicStore(createRootReducer(history), preloadedState);

  epicMiddleware.run(rootEpic);

  if (config.isDevelopment) {
    // just publish it globally to easily
    // inspect the current state of the store
    window.__reduxStore = store;
  }

  return store;
}
