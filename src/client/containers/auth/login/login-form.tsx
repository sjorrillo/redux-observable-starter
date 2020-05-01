import Button from '@material-ui/core/Button';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { LoginSchema, LoginType } from '../../../common/schemas/login';
import { CheckboxField, TextboxField } from '../../../components';

interface IOwnProps {
  message?: string;
  classes: any;
  onSubmit: (payload: LoginType) => void;
}

export const LoginForm = ({ classes, onSubmit }: IOwnProps) => {
  const { handleSubmit, errors, control } = useForm<LoginType>({
    validationSchema: LoginSchema,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmitHandler = React.useCallback(
    (data: LoginType) => {
      onSubmit && onSubmit(data);
    },
    [onSubmit]
  );

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <Controller
        as={
          <TextboxField
            autoComplete="email"
            error={errors.email?.message as any}
            label="Email Address"
            margin="normal"
            variant="standard"
            autoFocus
            fullWidth
          />
        }
        control={control}
        id="email"
        name="email"
      />
      <Controller
        as={
          <TextboxField
            autoComplete="current-password"
            error={errors.password?.message as any}
            label="Password"
            margin="normal"
            type="password"
            variant="standard"
            fullWidth
          />
        }
        control={control}
        id="password"
        name="password"
      />
      <Controller
        as={
          <CheckboxField
            color="primary"
            error={errors.rememberMe?.message as any}
            label="Remember me"
          />
        }
        control={control}
        id="rememberMe"
        name="rememberMe"
        onChange={([, value]) => value}
      />
      <Button
        className={classes.submit}
        color="primary"
        type="submit"
        variant="contained"
        fullWidth>
        Sign In
      </Button>
    </form>
  );
};
