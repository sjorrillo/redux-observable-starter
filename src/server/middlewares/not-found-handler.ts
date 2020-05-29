import Errors from '../common/errors';

export const notFoundHandler = () => () => {
  Errors.notFound('Route not found');
};
