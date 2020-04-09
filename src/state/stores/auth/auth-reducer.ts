import { handleActions } from 'redux-actions';

import { types } from './auth-action';

export interface IAuthState {
  readonly user?: any;
  readonly token?: string;
  readonly loggingIn?: boolean;
  readonly loggedIn?: boolean;
  readonly loggingOut?: boolean;
  readonly error?: string;
}

const initialState: IAuthState = {
  user: null,
  token: null,
  error: null,
};

export const authReducer = handleActions(
  {
    [types.LOGOUT]: state => ({
      ...state,
    }),
    [types.LOGOUT]: state => ({
      ...state,
    }),
    [types.RESTORE_STATE]: state => ({
      ...state,
    }),
  },
  initialState
);
