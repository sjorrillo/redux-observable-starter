import React from 'react';
import { Link, Switch } from 'react-router-dom';

import { RouteWithSubRoutes } from '../../../common/utilities/router-utility';

export const Dashboard = ({ routes }) => (
  <div>
    <h1>Dashboard</h1>
    <div>
      <ul>
        <li>
          <Link to="/admin/clients">Clients</Link>
        </li>
        <li>
          <Link to="/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/admin/quotes">Quotes</Link>
        </li>
      </ul>

      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  </div>
);

export const Clients = () => (
  <div>
    <h1>Clients</h1>
  </div>
);

export const Products = () => (
  <div>
    <h1>Products</h1>
  </div>
);

export const Quotes = () => (
  <div>
    <h1>Quotes</h1>
  </div>
);
