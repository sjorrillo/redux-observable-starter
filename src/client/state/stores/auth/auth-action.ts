import { createAction } from 'redux-actions';

import { LoginType } from '../../../../common/schemas';

export const types = {
  LOGIN: {
    START: 'auth:LOGIN/START',
    COMPLETED: 'auth:LOGIN/COMPLETED',
  },
  REFRESH_TOKEN: {
    START: 'auth:REFRESH_TOKEN/START',
    COMPLETED: 'auth:REFRESH_TOKEN/COMPLETED',
  },
  LOGOUT: 'auth:LOGOUT',
  RESTORE_STATE: 'auth:RESTORE_STATE',
};

export const login: (payload: LoginType) => void = createAction(types.LOGIN.START);

export const logout: () => void = createAction(types.LOGOUT);

export const restoreState: (state: any) => void = createAction<any>(types.RESTORE_STATE);

export const refreshToken: () => void = createAction(types.REFRESH_TOKEN.START);
