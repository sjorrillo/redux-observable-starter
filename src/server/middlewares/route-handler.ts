const routeHandler = (action) => {
  return async (req, res, next) => {
    try {
      await action(req, res);
    } catch (error) {
      next(error);
    }
  };
};

export const setRouteDecorator = (app) => {
  const routeMethods = ['get', 'post', 'put', 'patch', 'delete'];
  const router = {};

  routeMethods.forEach((method) => {
    router[method] = app[method].bind(app);
    app[method] = (route, ...routeMiddleware) => {
      if (!routeMiddleware.length) {
        return router[method](route);
      }

      const [routeAction] = routeMiddleware.splice(routeMiddleware.length - 1, 1);
      if (!routeAction) {
        throw new Error(`Missing action for route ${route}`);
      }

      return router[method](route, ...routeMiddleware, routeHandler(routeAction));
    };
  });
};
