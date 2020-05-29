import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';

import { extractFunctionsFromNamespace } from '../../../common/utils/obj-utils';
import { authEpics, authReducer, IAuthState } from '../stores/auth';
import { IPingState, pingEpics, pingReducer } from '../stores/ping';

export interface IApplicationStore {
  auth?: IAuthState;
  ping?: IPingState;
  router?: RouterState;
  [reducer: string]: any;
}

const epics = extractFunctionsFromNamespace(authEpics, pingEpics);

export const rootEpic = (action$, store, dependencies) =>
  combineEpics(...epics)(action$, store, dependencies).pipe(
    catchError((err, source) => {
      process.nextTick(() => {
        // TODO: handle errors
        console.log(`Unexpected error: ${err}.`);
        throw err;
      });
      return source;
    })
  );

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    ping: pingReducer,
  });
