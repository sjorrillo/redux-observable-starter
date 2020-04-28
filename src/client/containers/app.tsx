import React from 'react';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';

import { RouteWithSubRoutes } from '../common/utilities/router-utility';
import { routes } from './routes';

export class App extends React.Component<object, object> {
  render = (): JSX.Element => {
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
}
