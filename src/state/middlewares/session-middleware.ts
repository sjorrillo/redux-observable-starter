import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import { isLoggingOut, SESSION_STORAGE } from '../../common/modules/auth';
import { getFromStorage, setInStorage } from '../../common/utilities/storage';
import { logout, restoreState } from '../stores/auth';

const shouldLogout = (currentSession, prevSession) =>
  currentSession.loggingOut || (prevSession && !prevSession.user && !prevSession.token);

const shouldSaveSession = (currentSession, prevSession) =>
  !prevSession || currentSession.loggedIn || currentSession.loggingOut;

const getSessionFromStore = getState =>
  pick(getState().auth, ['user', 'token', 'loggedIn', 'loggingOut']);

let sessionHydrated = false;
let logoutDispatched = false;
const readSession = (getState, dispatch) => {
  const currentSession = getSessionFromStore(getState);
  const sessionLoaded = getFromStorage(SESSION_STORAGE);
  if (!logoutDispatched && shouldLogout(currentSession, sessionLoaded)) {
    logoutDispatched = true;
    dispatch(logout());
  }

  if (!sessionHydrated) {
    sessionHydrated = true;
    !isEqual(currentSession, sessionLoaded) && dispatch(restoreState(sessionLoaded));
  }
  return sessionLoaded;
};

const saveSession = (getState, prevSession) => {
  if (isLoggingOut()) return;

  const currentSession = getSessionFromStore(getState);
  if (isEqual(currentSession, prevSession)) return;

  if (!shouldSaveSession(currentSession, prevSession)) return;

  setInStorage(SESSION_STORAGE, currentSession);
};

export const sessionMiddleware = ({ dispatch, getState }) => next => action => {
  if (!action) {
    return next();
  }

  const sessionLoaded = readSession(getState, dispatch);
  const result = next(action);
  saveSession(getState, sessionLoaded);
  return result;
};
