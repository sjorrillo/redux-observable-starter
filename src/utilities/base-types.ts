export {};

declare global {
  interface Window {
    __reduxStore: any;
  }
}
