import { stringifyUrl } from 'query-string';
import { Observable, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import URL from 'url';

import config from '../../config';

interface IClientParms {
  data?: any;
  params?: object;
  headers?: object;
}

class ApiClient {
  private headers?: object;
  get: (url: string, { params, headers }: IClientParms) => Observable<AjaxResponse>;
  post: (url: string, { data, params, headers }: IClientParms) => Observable<AjaxResponse>;
  put: (url: string, { data, params, headers }: IClientParms) => Observable<AjaxResponse>;
  patch: (url: string, { data, params, headers }: IClientParms) => Observable<AjaxResponse>;
  delete: (url: string, { data, params, headers }: IClientParms) => Observable<AjaxResponse>;

  constructor() {
    ['get', 'post', 'put', 'patch', 'del'].forEach(method => {
      this[method] = (url: string, { data, params, headers }: IClientParms = {}) => {
        return ajax({
          url: this.formatUrl(url, params),
          method: method.toLocaleUpperCase(),
          ...(data ? { body: data } : {}),
          headers: {
            ...(this.headers || {}),
            ...(headers || {}),
          },
        }).pipe(
          map(({ response }) => response),
          catchError(_error => {
            return of({
              error: true,
              payload: 'error message',
            });
          })
        );
      };
    });
  }

  private formatUrl = (path: string, params?: any) => {
    const endpoint = path[0] === '/' ? path.substring(1) : path;
    const url = URL.resolve(config.apiUrl, endpoint);

    return params ? stringifyUrl({ url, query: params }) : url;
  };

  clearHeaders = () => {
    this.headers = null;
  };

  setExtraHeaders = headers => {
    this.headers = {
      ...(this.headers || {}),
      ...headers,
    };
  };
}

export const client = new ApiClient();
