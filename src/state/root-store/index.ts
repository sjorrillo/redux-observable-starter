import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { pingEpic, pingReducer, IPingState } from '../stores/ping';

export interface IApplicationStore {
  ping?: IPingState;
  router?: RouterState;
  [reducer: string]: any;
}

export const rootEpic = combineEpics(pingEpic);

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ping: pingReducer,
  });
