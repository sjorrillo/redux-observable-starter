import { Action } from 'redux';

import { ApiClient } from './modules/xhr';

declare global {
  interface Window {
    __reduxStore: any;
  }
}

export type ValueOf<T> = T[keyof T];

export type KeyValuePair<T = string> = { [key: string]: T };

export type Dependencies = {
  client: ApiClient;
};

export interface IAction<TPayload = any, TMeta = any> extends Action<string> {
  payload?: TPayload;
  meta?: TMeta;
  error?: boolean;
}

export enum RequestStatus {
  Initial = 'initial',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
