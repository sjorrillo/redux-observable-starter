import { removeFromStorage } from '../utilities/storage';

export const SESSION_STORAGE = 'starter-auth';

let loggingOut = false;
export const isLoggingOut = () => !!loggingOut;

export const logout = () => {
  loggingOut = true;
  removeFromStorage(SESSION_STORAGE);
  // eslint-disable-next-line no-undef
  location.reload();
};

export const isTokenExpired = (tokenExpirationTime?: number) => {
  if (!tokenExpirationTime || tokenExpirationTime <= 0) return;

  const date = new Date();
  const localTimeInSeconds = date.getTime() / 1000;

  return localTimeInSeconds > tokenExpirationTime;
};
