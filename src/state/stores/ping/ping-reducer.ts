import { handleActions } from 'redux-actions';

export const pingReducer = handleActions(
  {
    PING: state => ({
      ...state,
      isPinging: true,
    }),
    PONG: state => ({
      ...state,
      isPinging: false,
    }),
  },
  { isPinging: false }
);
