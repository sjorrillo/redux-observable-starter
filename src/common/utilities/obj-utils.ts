import { isString, isFunction } from './type-of';

export const createObjectByPath = (
  obj: object,
  path: string | string[],
  value: any = null
): object => {
  path = isString(path) ? (path as string).split('.') : path;
  let current = obj;
  while (path.length > 1) {
    const [head, ...tail] = path as string[];
    path = tail;
    if (current[head] === undefined) {
      current[head] = {};
    }
    current = current[head];
  }
  current[path[0]] = value;
  return obj;
};

export const extractFunctionsFromNamespace = (...namespaces) =>
  namespaces.reduce(
    (acc, namespace) =>
      Object.keys(namespace).reduce((acc, key) => {
        const action = namespace[key];
        return [...acc, ...(isFunction(action) ? [action] : [])];
      }, acc),
    []
  );