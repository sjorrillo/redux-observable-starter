interface IServieErrorArgs {
  message: string;
  token?: string;
  status?: number;
  data?: any;
}

const tokenByStatusCodeHash = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  412: 'PRECONDITION_FAILED',
  500: 'INTERNAL_SERVER_ERROR',
};

class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor.name as any);
  }
}

export class ServiceError extends BaseError {
  private token: string;

  constructor(options: IServieErrorArgs | string) {
    const genericErrorToken = 'GENERIC_ERROR';
    if (options instanceof Object) {
      const { token, ...properties } = options;

      const errorToken = token || tokenByStatusCodeHash[options.status] || genericErrorToken;
      super(options.message);
      this.token = errorToken;

      Object.assign(this, properties);
    } else {
      super(options);
      this.token = genericErrorToken;
    }
  }
}

export default class Errors {
  static badRequest(message: string, data?: any, token?: string): ServiceError {
    throw new ServiceError({
      message,
      status: 400,
      token,
      data,
    });
  }

  static unauthorized(message: string, data?: any, token?: string): ServiceError {
    throw new ServiceError({
      message,
      status: 401,
      token,
      data,
    });
  }

  static forbidden(message: string, data?: any, token?: string): ServiceError {
    throw new ServiceError({
      message,
      status: 403,
      token,
      data,
    });
  }

  static notFound(message: string, data?: any, token?: string): ServiceError {
    throw new ServiceError({
      message,
      status: 404,
      token,
      data,
    });
  }

  static preconditionFailed(message: string, data?: any, token?: string): ServiceError {
    throw new ServiceError({
      message,
      status: 412,
      token,
      data,
    });
  }

  static badImplementation(message: string, data?: any, token?: string): ServiceError {
    throw new ServiceError({
      message,
      status: 500,
      token,
      data,
    });
  }
}
