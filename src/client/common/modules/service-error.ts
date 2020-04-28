import { Store } from 'redux';

import { IApplicationStore } from '../../state/root-store';
import { mediator, EventType } from './mediator';

export const init = (_store: Store<IApplicationStore>) => {
  mediator.on(EventType.ServiceError, {
    next: ({ response, error, unauthorized, forbidden }) => {
      console.log('Service Error:', { response, error, unauthorized, forbidden });
      if (forbidden) {
        // TODO: Dispatch forbidden dialog
        // store.dispatch;
      }
    },
  });
};
