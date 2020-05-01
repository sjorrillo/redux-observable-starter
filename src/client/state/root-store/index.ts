import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { extractFunctionsFromNamespace } from '../../common/utilities/obj-utils';
import { authEpics, authReducer, IAuthState } from '../stores/auth';
import { IPingState, pingEpics, pingReducer } from '../stores/ping';

export interface IApplicationStore {
  auth?: IAuthState;
  ping?: IPingState;
  router?: RouterState;
  [reducer: string]: any;
}

const epics = extractFunctionsFromNamespace(authEpics, pingEpics);

export const rootEpic = combineEpics(...epics);

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    ping: pingReducer,
  });
