import { AppTypes } from '../common/constants/app-types';
import { IRouteProps } from '../common/utilities/router-utility';
import { Clients, Dashboard, Products, Quotes } from './admin';
import { Home, Login } from './index';

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
export const routes: IRouteProps[] = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/admin',
    component: Dashboard,
    requiresAuthentication: true,
    mainRoles: [AppTypes.MainRoles.ADMIN, AppTypes.MainRoles.CLIENT],
    routes: [
      {
        path: '/admin/clients',
        component: Clients,
      },
      {
        path: '/admin/products',
        component: Products,
      },
      {
        path: '/admin/quotes',
        component: Quotes,
        mainRoles: [AppTypes.MainRoles.ADMIN],
      },
    ],
  },
];
