import { createAction } from 'redux-actions';

import { LoginType } from '../../../common/schemas';

export const types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
  RESTORE_STATE: 'auth/RESTORE_STATE',
};

export const login: (payload: LoginType) => void = createAction(types.LOGIN);

export const logout: () => void = createAction(types.LOGOUT);

export const restoreState: (state: any) => void = createAction<any>(types.RESTORE_STATE);
