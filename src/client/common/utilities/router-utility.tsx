import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isUserInRole } from '../modules/auth/utils';

export interface IRouteProps {
  component?: React.ComponentType<any>;
  path?: string | string[];
  exact?: boolean;
  requiresAuthentication?: boolean;
  mainRoles?: string[];

  layout?: React.ComponentType<any>;
  routes?: IRouteProps[];
  user?: any;
}

export const RouteWithSubRoutes = ({
  path,
  routes,
  component: Component,
  requiresAuthentication,
  mainRoles,
  layout,
  user,
  ...rest
}: IRouteProps) => (
  <Route
    {...rest}
    path={path}
    render={(props) => {
      const hasRights = !requiresAuthentication || isUserInRole(user, mainRoles);

      if (!hasRights) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }

      const Layout = layout || React.Fragment;
      return (
        <Layout>
          <Component
            {...props}
            routes={routes?.map((route) => ({
              ...route,
              requiresAuthentication,
              user,
              mainRoles: [].concat(route?.mainRoles?.length ? route.mainRoles : mainRoles || []),
            }))}
          />
        </Layout>
      );
    }}
  />
);
