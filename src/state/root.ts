import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { pingEpic, pingReducer } from './stores/ping';

export const rootEpic = combineEpics(pingEpic);

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ping: pingReducer,
  });
