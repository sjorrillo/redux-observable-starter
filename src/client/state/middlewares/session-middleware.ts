import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import { isLoggingOut, SESSION_STORAGE } from '../../common/modules/auth';
import { mediator, EventType } from '../../common/modules/mediator';
import { removeNullishProps } from '../../common/utilities/obj-utils';
import { getFromStorage, setInStorage } from '../../common/utilities/storage';
import { logout, restoreState } from '../stores/auth';

const shouldLogout = (currentSession, prevSession) => prevSession && !currentSession;

const shouldLogin = (currentSession, prevSession) => !prevSession && currentSession;

const shouldHydrateSession = (currentSession, sessionLoaded) =>
  !isEqual(currentSession, sessionLoaded) && sessionLoaded;

const getSessionFromStore = getState =>
  removeNullishProps(pick(getState().auth, ['user', 'token', 'tokenExpirationTime']));

let sessionHydrated = false;
let logoutDispatched = false;
const readSession = (getState, dispatch) => {
  const currentSession = getSessionFromStore(getState);
  const sessionLoaded = getFromStorage(SESSION_STORAGE);
  if (sessionHydrated && !logoutDispatched && shouldLogout(currentSession, sessionLoaded)) {
    logoutDispatched = true;
    dispatch(logout());
  }

  if (!sessionHydrated && shouldHydrateSession(currentSession, sessionLoaded)) {
    sessionHydrated = true;
    mediator.emit(EventType.Login, sessionLoaded);
    dispatch(restoreState(sessionLoaded));
  }
  return sessionLoaded;
};

const saveSession = (getState, prevSession) => {
  if (isLoggingOut()) {
    mediator.emit(EventType.Logout, prevSession);
    return;
  }

  const currentSession = getSessionFromStore(getState);
  if (isEqual(currentSession, prevSession)) return;

  if (!shouldLogin(currentSession, prevSession)) return;

  mediator.emit(EventType.Login, currentSession);
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
