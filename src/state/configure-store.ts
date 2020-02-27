import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer, rootEpic } from './root';

const epicMiddleware = createEpicMiddleware();

export const condfigureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
};
