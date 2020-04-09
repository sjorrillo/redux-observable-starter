import { ofType, Epic } from 'redux-observable';
import { empty } from 'rxjs';
import { switchMap, pluck, tap } from 'rxjs/operators';

import { IAction, Dependencies } from '../../../common/base-types';
import { LoginType } from '../../../common/schemas';
import { IApplicationStore } from '../../root-store/index';
import { types } from './auth-action';

export const loginEpic: Epic<IAction<LoginType>, IAction, IApplicationStore, Dependencies> = (
  action$,
  _state,
  { client }
) =>
  action$.pipe(
    ofType(types.LOGIN),
    pluck('payload'),
    tap(console.log),
    switchMap(_data => {
      return empty();
    })
  );
