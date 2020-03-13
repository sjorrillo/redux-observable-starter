import { ofType } from 'redux-observable';
import { mapTo, delay, map, concatMap } from 'rxjs/operators';

import { client } from '../../../common/modules/api-client';
import { types } from './ping-action';

export const pingEpic = action$ =>
  action$.pipe(
    ofType(types.PING),
    delay(1000),
    map(action => action.payload),
    concatMap(a => {
      return client
        .get('/users', {
          params: {
            per_page: 5,
          },
        })
        .pipe(map(response => console.log('users: ', response)));
    }),
    mapTo({ type: types.PONG })
  );
