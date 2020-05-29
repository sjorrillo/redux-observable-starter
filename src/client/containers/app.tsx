import React from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { RouteWithSubRoutes } from '../common/utilities/router-utility';
import { IApplicationStore } from '../state/root-store';
import { routes } from './routes';

interface IStateProps {
  user?: any;
  isAuthenticated?: boolean;
}

interface IDispatchProps {}

interface IOwnProps {}

const App: React.FC<IStateProps & IDispatchProps & IOwnProps> = ({ isAuthenticated, user }) => {
  const wideAvailableElements = React.useMemo(() => <div id="wideElements" />, []);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isAuthenticated && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/admin">admin</Link>
            </li>
          )}
        </ul>
        {isAuthenticated && (
          <div>
            user: {user.id}
            <button>logout</button>
          </div>
        )}
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} user={user} />
          ))}
        </Switch>
      </div>
      {wideAvailableElements}
    </Router>
  );
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  (state: IApplicationStore): IStateProps => ({
    user: state.auth.user,
    isAuthenticated: !!state.auth.user,
  }),
  (dispatch): IDispatchProps => bindActionCreators({}, dispatch)
)(App);
