export enum EventType {
  Login = 'user:login',
  Logout = 'user:logout',
  ServiceError = 'service:error',
}

export interface IMediatorEvent {
  type: EventType;
  payload?: any;
}
