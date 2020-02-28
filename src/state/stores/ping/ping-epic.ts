import { ofType } from 'redux-observable';
import { mapTo, delay } from 'rxjs/operators';

import { types } from './ping-action';

export const pingEpic = action$ =>
  action$.pipe(ofType(types.PING), delay(1000), mapTo({ type: types.PONG }));
