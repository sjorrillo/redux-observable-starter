import Button from '@material-ui/core/Button';
import { withFormik, FormikProps, Form } from 'formik';
import React from 'react';

import { LoginType, LoginSchema } from '../../../common/schemas/login';
import { TextboxField, CheckboxField } from '../../../components';

interface IOwnProps {
  message?: string;
  classes: any;
}

const innerLoginForm = ({
  classes,
  handleSubmit,
  isSubmitting,
}: IOwnProps & FormikProps<LoginType>) => (
  <Form className={classes.form} onSubmit={handleSubmit} noValidate>
    <TextboxField
      variant="standard"
      margin="normal"
      fullWidth
      id="email"
      name="email"
      label="Email Address"
      autoComplete="email"
      autoFocus
    />
    <TextboxField
      variant="standard"
      margin="normal"
      fullWidth
      id="password"
      name="password"
      label="Password"
      type="password"
      autoComplete="current-password"
    />
    <CheckboxField color="primary" name="rememberMe" label="Remember me" />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      disabled={isSubmitting}>
      Sign In
    </Button>
  </Form>
);

export const LoginForm = withFormik<IOwnProps, LoginType>({
  mapPropsToValues: (_props): LoginType => ({
    email: '',
    password: '',
    rememberMe: false,
  }),
  validationSchema: LoginSchema,
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  validateOnBlur: true,
  validateOnChange: false,
})(innerLoginForm);
