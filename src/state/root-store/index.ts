import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { isFunction } from '../../common/utilities/type-of';
import { IAuthState, authReducer, loginEpic } from '../stores/auth';
import { IPingState, pingReducer, pingEpic } from '../stores/ping';

export interface IApplicationStore {
  auth?: IAuthState;
  ping?: IPingState;
  router?: RouterState;
  [reducer: string]: any;
}

const createEpicArray = (...epicObject) =>
  epicObject.reduce((acc, obj) => {
    Object.keys(obj).reduce((acc, key) => {
      const action = obj[key];
      return !isFunction(action) ? acc : [...acc, action];
    }, acc);
  }, []);

export const rootEpic = combineEpics(...[loginEpic, pingEpic]);

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    ping: pingReducer,
  });
