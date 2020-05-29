import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, concatMap, pluck, switchMap } from 'rxjs/operators';

import { LoginType } from '../../../../common/schemas';
import { Dependencies, IAction } from '../../../common/base-types';
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
    switchMap(({ email, password }) => {
      return client
        .post('/auth/login', {
          data: { email, password },
        })
        .pipe(
          concatMap((response) =>
            of({
              user: response.user,
              token: response.jwtToken,
              tokenExpiry: response.jwtTokenExpiry,
            })
          )
        );
    }),
    concatMap((payload) => of({ type: types.LOGIN.COMPLETED, payload })),
    catchError((err) =>
      of({ type: types.LOGIN.COMPLETED, error: true, payload: err.response?.error || err.message })
    )
  );

export const refreshTokenEpic: Epic<IAction, IAction, IApplicationStore, Dependencies> = (
  action$,
  _state,
  { client }
) =>
  action$.pipe(
    ofType(types.REFRESH_TOKEN.START),
    switchMap(() => {
      return client.post('/auth/refreshToken').pipe(
        concatMap((response) =>
          of({
            user: response.user,
            token: response.jwtToken,
            tokenExpiry: response.jwtTokenExpiry,
          })
        )
      );
    }),
    concatMap((payload) => of({ type: types.REFRESH_TOKEN.COMPLETED, payload })),
    catchError((err) =>
      of({
        type: types.REFRESH_TOKEN.COMPLETED,
        error: true,
        payload: err.response?.error || err.message,
      })
    )
  );
