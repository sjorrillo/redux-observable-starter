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
