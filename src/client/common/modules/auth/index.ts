import isEqual from 'lodash/isEqual';
import { Store } from 'redux';

import { removeNullishProps } from '../../../../common/utils/obj-utils';
import { IApplicationStore } from '../../../state/root-store';
import { refreshToken } from '../../../state/stores/auth';
import { getFromStorage, removeFromStorage, setInStorage } from '../../utilities/storage';
import { EventType, mediator } from '../mediator';
import AuthSync from './auth-sync';
import { PROFILE_STORAGE_KEY } from './utils';

export const init = (store: Store<IApplicationStore>) => {
  const authSync = AuthSync.create(store);
  let prevAuth = null;

  store.subscribe(() => {
    const auth = store.getState().auth;
    if (isEqual(auth, prevAuth)) return;

    if (!prevAuth?.user && auth?.user) {
      authSync.startLoginMode({ token: auth.token, tokenExpiry: auth.tokenExpiry });
      mediator.emit(EventType.Login, { user: auth.user });
      prevAuth = auth;

      setInStorage(PROFILE_STORAGE_KEY, removeNullishProps(auth.user));
    } else if (prevAuth?.user && !auth?.user) {
      authSync.endLoginMode();
      mediator.emit(EventType.Logout, { user: prevAuth.user });
      prevAuth = null;

      removeFromStorage(PROFILE_STORAGE_KEY);
    } else if (auth?.tokenExpiry && auth?.tokenExpiry !== authSync.getToken()?.tokenExpiry) {
      console.log('hidrate');
      authSync.hydrateToken({ token: auth.token, tokenExpiry: auth.tokenExpiry });
    }
  });

  const sessionLoaded = getFromStorage(PROFILE_STORAGE_KEY);
  if (sessionLoaded) {
    store.dispatch(refreshToken() as any);
  }
};
