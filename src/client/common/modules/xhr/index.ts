import { Store } from 'redux';

import { IApplicationStore } from '../../../state/root-store';
import { EventType, mediator } from '../mediator';
import apiClient from './api-client';

export type ApiClient = apiClient;

export const client = apiClient.create();

export const init = (store: Store<IApplicationStore>) => {
  mediator.on(EventType.Login, {
    next: payload => {
      const { auth } = store.getState();
      console.log('Login:', { payload, auth });
      if (!auth.token) return;

      client.setHeaders({
        Authorization: `Bearer ${auth.token}`,
      });
    },
  });
  mediator.on(EventType.Logout, {
    next: payload => {
      console.log('Logout:', payload);
      client.removeHeader('Authorization');
    },
  });
};
