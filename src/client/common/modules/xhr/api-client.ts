import { stringifyUrl } from 'query-string';
import { Observable, of, throwError } from 'rxjs';
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax';
import { catchError, flatMap } from 'rxjs/operators';
import URL from 'url';

import config from '../../../config';
import { KeyValuePair } from '../../base-types';
import { isUrl } from '../../regex';
import { isObject } from '../../utilities/type-of';
import { isTokenExpired } from '../auth';
import { EventType, mediator } from '../mediator';

interface IClientParms {
  data?: any;
  params?: object;
  headers?: object;
  errorHandled?: boolean;
}

export default class ApiClient {
  private headers?: KeyValuePair;
  public tokenExpirationTime?: number;

  get: (url: string, { params, headers }: IClientParms) => Observable<AjaxResponse | any>;
  post: (url: string, { data, params, headers }: IClientParms) => Observable<AjaxResponse | any>;
  put: (url: string, { data, params, headers }: IClientParms) => Observable<AjaxResponse | any>;
  patch: (url: string, { data, params, headers }: IClientParms) => Observable<AjaxResponse | any>;
  delete: (url: string, { data, params, headers }: IClientParms) => Observable<AjaxResponse | any>;

  constructor() {
    ['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
      this[method] = (url: string, { data, params, headers, errorHandled }: IClientParms = {}) => {
        if (isTokenExpired(this.tokenExpirationTime)) {
          const error = new Error('Expired jwt token');
          mediator.emit(EventType.ServiceError, {
            response: {},
            error,
            unauthorized: true,
          });
          throwError(error);
        }

        return ajax({
          url: this.formatUrl(url, params),
          method: method.toLocaleUpperCase(),
          body: data,
          headers: {
            ...(this.headers || {}),
            ...(headers || {}),
          },
        }).pipe(
          flatMap((ajaxResponse: AjaxResponse) => {
            const { response, status } = ajaxResponse;
            if ((status >= 200 && status < 300) || status === 304) {
              return of(response);
            }

            return throwError(ajaxResponse);
          }),
          catchError((error: AjaxError) => {
            const { status } = error || {};

            const unauthorized = status === 401;
            const forbidden = status === 403;

            if (!errorHandled || unauthorized || forbidden) {
              mediator.emit(EventType.ServiceError, {
                response: error.response,
                error,
                unauthorized,
                forbidden,
              });
            }
            return throwError(error);
          })
        );
      };
    });

    this.headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  static create() {
    return new ApiClient();
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

  setHeaders = (headers: KeyValuePair) => {
    this.headers = {
      ...(this.headers || {}),
      ...headers,
    };
  };

  removeHeader = (key: string) => {
    if (!this.headers || !key) return;

    delete this.headers[key];
  };
}
