import { handleActions } from 'redux-actions';

import { IAction, RequestStatus } from '../../../common/base-types';
import { types } from './auth-action';

export interface IAuthState {
  readonly user?: any;
  readonly token?: string;
  readonly tokenExpiry?: string;
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
    [types.LOGIN.COMPLETED]: (state, { payload, error }: IAction<any>) => {
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
        tokenExpiry: payload.tokenExpiry,
        error: null,
        requestStatus: RequestStatus.Success,
      };
    },
    [types.LOGOUT]: (state) => ({
      ...state,
      user: null,
      token: null,
      tokenExpiry: null,
      requestStatus: RequestStatus.Initial,
    }),
    [types.REFRESH_TOKEN.START]: (state) => ({
      ...state,
    }),
    [types.REFRESH_TOKEN.COMPLETED]: (state, { payload, error }: IAction<any>) => {
      console.log('types.REFRESH_TOKEN.COMPLETED', { payload, error });
      if (error) {
        return {
          ...state,
          token: null,
          tokenExpiry: null,
        };
      }

      return {
        ...state,
        token: payload.token,
        tokenExpiry: payload.tokenExpiry,
        user: payload.user,
      };
    },
    [types.RESTORE_STATE]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
