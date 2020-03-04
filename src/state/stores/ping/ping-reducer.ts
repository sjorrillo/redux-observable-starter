import { handleActions } from 'redux-actions';

import { types } from './ping-action';
import { IPingState } from './ping-types';

const initialState: IPingState = {
  isPinging: false,
};

export const pingReducer = handleActions(
  {
    [types.PING]: state => ({
      ...state,
      isPinging: true,
    }),
    [types.PONG]: state => ({
      ...state,
      isPinging: false,
    }),
  },
  initialState
);
