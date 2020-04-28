import { createAction } from 'redux-actions';

export const types = {
  PING: 'PING',
  PONG: 'PONG',
};

export const testAction = createAction<number>(types.PING);
