import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { LoginType } from '../../../../common/schemas';
import { RequestStatus } from '../../../common/base-types';
import { logout } from '../../../common/modules/auth/utils';
import { IApplicationStore } from '../../../state/root-store';
import { login } from '../../../state/stores/auth/auth-action';
import { LoginForm } from './login-form';

interface IStateProps {
  isLoading?: boolean;
  error?: string;
  user?: any;
  isAuthenticated?: boolean;
}

interface IDispatchProps {
  onLogin: (params: LoginType) => void;
}

interface IOwnProps extends RouteComponentProps<any> {}

const Copyright = ({ isAuthenticated }) => {
  return (
    <Typography align="center" color="textSecondary" variant="body2">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
      {isAuthenticated && (
        <Link color="inherit" onClick={() => logout()}>
          Logout
        </Link>
      )}
    </Typography>
  );
};

const useStyles = makeStyles<Theme>((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  red: {
    color: (props: any) => props.color,
  },
}));

const Login: React.FC<IStateProps & IDispatchProps & IOwnProps> = ({
  onLogin,
  isLoading,
  error,
  user,
  isAuthenticated,
  history,
}) => {
  const classes = useStyles({ color: 'green' });
  const title = `Sign in - user: ${user?.email} - isLoading: ${isLoading} - error: ${error}`;

  React.useEffect(() => {
    // TODO: authenticated but missing rols
    if (isAuthenticated) {
      history.push('/admin');
    }
  }, [isAuthenticated, history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <LoginForm {...{ classes }} onSubmit={onLogin} />
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link className={classes.red} href="#" variant="body2">
              Dont have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright {...{ isAuthenticated }} />
      </Box>
    </Container>
  );
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  (state: IApplicationStore): IStateProps => ({
    isLoading: state.auth.requestStatus === RequestStatus.Loading,
    error: state.auth.requestStatus === RequestStatus.Error ? state.auth.error : null,
    user: state.auth.user,
    isAuthenticated: !!state.auth.user,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        onLogin: login,
      },
      dispatch
    )
)(Login);
