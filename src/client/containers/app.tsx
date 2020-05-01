import React from 'react';
import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';

import { RouteWithSubRoutes } from '../common/utilities/router-utility';
import { routes } from './routes';

export const App = (): JSX.Element => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/sandwiches">Sandwiches</Link>
          </li>
          <li>
            <Link to="/tacos">Tacos</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
};
