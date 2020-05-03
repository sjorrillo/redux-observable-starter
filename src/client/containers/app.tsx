import React from 'react';
import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';

import { RouteWithSubRoutes } from '../common/utilities/router-utility';
import { routes } from './routes';

export const App: React.FC<any> = () => {
  const wideAvailableElements = React.useMemo(() => <div id="wideElements" />, []);

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
            <Link to="/admin">admin</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
      {wideAvailableElements}
    </Router>
  );
};
