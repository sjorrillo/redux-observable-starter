import { Epic, ofType } from 'redux-observable';
import { delay, mapTo, pluck, switchMap } from 'rxjs/operators';

import { Dependencies, IAction } from '../../../common/base-types';
import { IApplicationStore } from '../../root-store/index';
import { types } from './ping-action';

export const pingEpic: Epic<IAction<number>, IAction<number>, IApplicationStore, Dependencies> = (
  action$,
  _state,
  { client }
) =>
  action$.pipe(
    ofType(types.PING),
    delay(1000),
    pluck('payload'),
    switchMap((records) => {
      return client.get('https://httpbin.org/delay/1', {
        params: {
          per_page: records, // eslint-disable-line camelcase
        },
      });
    }),
    mapTo({ type: types.PONG })
  );
