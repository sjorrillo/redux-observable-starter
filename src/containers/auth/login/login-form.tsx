import Button from '@material-ui/core/Button';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { LoginType, LoginSchema } from '../../../common/schemas/login';
import { TextboxField, CheckboxField } from '../../../components';

interface IOwnProps {
  message?: string;
  classes: any;
  onSubmit: (payload: LoginType) => void;
}

export const LoginForm = ({ classes, onSubmit }: IOwnProps) => {
  const { handleSubmit, errors, control } = useForm<LoginType>({
    validationSchema: LoginSchema,
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
            variant="standard"
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={errors.email?.message as any}
          />
        }
        id="email"
        name="email"
        control={control}
      />
      <Controller
        as={
          <TextboxField
            variant="standard"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message as any}
          />
        }
        id="password"
        name="password"
        control={control}
      />
      <Controller
        as={
          <CheckboxField
            color="primary"
            label="Remember me"
            error={errors.rememberMe?.message as any}
          />
        }
        id="rememberMe"
        name="rememberMe"
        onChange={([, value]) => value}
        control={control}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}>
        Sign In
      </Button>
    </form>
  );
};
