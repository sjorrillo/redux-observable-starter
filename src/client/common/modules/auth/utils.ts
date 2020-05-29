export const PROFILE_STORAGE_KEY = 'profile'; // remover el export luego del middle
export const LOGIN_STORAGE_KEY = 'login'; // remover el export luego del middle

// export const logout = () => {
//   loggingOut = true;
//   removeFromStorage(PROFILE_STORAGE_KEY);
//   // eslint-disable-next-line no-undef
//   location.reload();
// }; // borrar

// ver es usado en el api-client
export const isTokenExpired = (tokenExpirationTime?: number) => {
  if (!tokenExpirationTime || tokenExpirationTime <= 0) return;

  const date = new Date();
  const localTimeInSeconds = date.getTime() / 1000;

  return localTimeInSeconds > tokenExpirationTime;
};

export const isUserInRole = (user: any, allowedRoles?: string[]) => {
  if (!allowedRoles?.length && user) return true;

  return user?.roles?.some((role) => allowedRoles.includes(role));
};
