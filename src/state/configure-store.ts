import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { createRootReducer, rootEpic } from './root';

const devMode = true; // Read from environment

export const history = createBrowserHistory();

export default function condfigureStore({ preloadedState }) {
  const epicMiddleware = createEpicMiddleware();
  let storeCreator = compose(applyMiddleware(routerMiddleware(history), epicMiddleware));

  const basicStore = storeCreator(createStore);
  const store = basicStore(createRootReducer(history), preloadedState);

  epicMiddleware.run(rootEpic);

  if (devMode) {
    // just publish it globally to easily
    // inspect the current state of the store
    window.__reduxStore = store;
  }

  return store;
}
