import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isUserInRole } from '../modules/auth';

export interface IRouteProps {
  component?: React.ComponentType<any>;
  path?: string | string[];
  exact?: boolean;
  requiresAuthentication?: boolean;
  mainRoles?: string[];

  routes?: IRouteProps[];
}

// TODO: read from store
const fakeUser = {
  isAuthenticated: true,
  roles: ['admin'],
};

export const RouteWithSubRoutes = ({
  path,
  routes,
  component: Component,
  requiresAuthentication,
  mainRoles,
  ...rest
}: IRouteProps) => (
  <Route
    {...rest}
    path={path}
    render={(props) =>
      !requiresAuthentication ||
      isUserInRole(fakeUser.roles, mainRoles, fakeUser.isAuthenticated) ? (
        <Component
          {...props}
          routes={routes?.map((route) => ({
            ...route,
            requiresAuthentication,
            mainRoles: [].concat(route?.mainRoles?.length ? route.mainRoles : mainRoles || []),
          }))}
        /> // pass the sub-routes down to keep nesting
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
