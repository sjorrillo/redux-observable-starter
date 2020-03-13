export {};

declare global {
  interface Window {
    __reduxStore: any;
  }
}

export type ValueOf<T> = T[keyof T];
