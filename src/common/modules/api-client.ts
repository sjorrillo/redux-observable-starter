import { stringifyUrl } from 'query-string';
import { ajax } from 'rxjs/ajax';
import URL from 'url';

import config from '../../config';
import { isUrl } from '../regex';
import { isObject } from '../utilities/type-of';

interface IClientParms {
  data?: any;
  params?: object;
  headers?: object;
}

export default class ApiClient {
  private headers?: object;

  get: (url: string, { params, headers }: IClientParms) => Promise<XMLHttpRequest | unknown>;
  post: (url: string, { data, params, headers }: IClientParms) => Promise<XMLHttpRequest | unknown>;
  put: (url: string, { data, params, headers }: IClientParms) => Promise<XMLHttpRequest | unknown>;
  patch: (
    url: string,
    { data, params, headers }: IClientParms
  ) => Promise<XMLHttpRequest | unknown>;
  delete: (
    url: string,
    { data, params, headers }: IClientParms
  ) => Promise<XMLHttpRequest | unknown>;

  constructor() {
    ['get', 'post', 'put', 'patch', 'del'].forEach(method => {
      this[method] = (url: string, { data, params, headers }: IClientParms = {}) => {
        return ajax({
          url: this.formatUrl(url, params),
          method: method.toLocaleUpperCase(),
          body: data,
          headers: {
            ...(this.headers || {}),
            ...(headers || {}),
          },
        });
      };
    });

    this.headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  private formatUrl = (path: string, params: any) => {
    let url = path;
    if (!isUrl(path)) {
      const endpoint = path[0] === '/' ? path.substring(1) : path;
      url = URL.resolve(config.apiUrl, endpoint);
    }

    return params && isObject(params) ? stringifyUrl({ url, query: params }) : url;
  };

  clearHeaders = () => {
    this.headers = null;
  };

  setHeaders = headers => {
    this.headers = {
      ...(this.headers || {}),
      ...headers,
    };
  };
}

export const client = new ApiClient();
