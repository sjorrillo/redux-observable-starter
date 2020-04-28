import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';
import { switchMap, pluck, concatMap, catchError } from 'rxjs/operators';

import { IAction, Dependencies } from '../../../common/base-types';
import { LoginType } from '../../../common/schemas';
import { IApplicationStore } from '../../root-store';
import { types } from './auth-action';

export const loginEpic: Epic<IAction<LoginType>, IAction, IApplicationStore, Dependencies> = (
  action$,
  _state,
  { client }
) =>
  action$.pipe(
    ofType(types.LOGIN.START),
    pluck('payload'),
    switchMap(data => {
      const payload = data.rememberMe
        ? { email: 'peter@klaven' } // error request
        : { email: 'eve.holt@reqres.in', password: 'cityslicka' }; // successful request

      return client
        .post('https://reqres.in/api/login', {
          data: payload,
        })
        .pipe(concatMap(response => of({ user: { email: payload.email }, token: response.token })));
    }),
    concatMap(payload => of({ type: types.LOGIN.COMPLETED, payload })),
    catchError(err =>
      of({ type: types.LOGIN.COMPLETED, error: true, payload: err.response?.error || err.message })
    )
  );
