import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { pingEpic, pingReducer } from './stores/ping';

export const rootEpic = combineEpics(pingEpic);

export const rootReducer = combineReducers({
  ping: pingReducer,
});
