import * as authEpics from './auth-epic';
export { authEpics }; // plugin-proposal-export-namespace-from is not working with parcel
export { logout, restoreState, types } from './auth-action';
export { authReducer, IAuthState } from './auth-reducer';
