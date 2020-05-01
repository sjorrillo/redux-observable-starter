import { handleActions } from 'redux-actions';

import { RequestStatus } from '../../../common/base-types';
import { types } from './auth-action';

export interface IAuthState {
  readonly user?: any;
  readonly token?: string;
  readonly tokenExpirationTime?;
  readonly error?: string;
  readonly requestStatus?: RequestStatus;
}

const initialState: IAuthState = {
  user: null,
  token: null,
  error: null,
  requestStatus: RequestStatus.Initial,
};

export const authReducer = handleActions(
  {
    [types.LOGIN.START]: (state) => ({
      ...state,
      requestStatus: RequestStatus.Loading,
    }),
    [types.LOGIN.COMPLETED]: (state, { payload, error }: any) => {
      if (error) {
        return {
          ...state,
          user: null,
          error: payload,
          requestStatus: RequestStatus.Error,
        };
      }

      return {
        ...state,
        user: payload.user,
        token: payload.token,
        tokenExpirationTime: 1000 * 60 * 5,
        error: null,
        requestStatus: RequestStatus.Success,
      };
    },
    [types.LOGOUT]: (state) => ({
      ...state,
      user: null,
      token: null,
      tokenExpirationTime: null,
      requestStatus: RequestStatus.Initial,
    }),
    [types.RESTORE_STATE]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
