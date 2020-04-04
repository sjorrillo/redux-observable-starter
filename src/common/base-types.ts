import { Action } from 'redux';

import ApiClient from './modules/api-client';

declare global {
  interface Window {
    __reduxStore: any;
  }
}

export type ValueOf<T> = T[keyof T];

export type Dependencies = {
  client: ApiClient;
};

export interface IAction<TPayload = any, TMeta = any> extends Action<string> {
  payload?: TPayload;
  meta?: TMeta;
}

export enum RequestStatus {
  Initial = 'initial',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
