import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react';

export const TextboxField = ({
  error,
  ...props
}: { error?: string | React.ReactElement } & TextFieldProps) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const textInput = React.useRef();
  const showError = !!error;

  const handleClickPasswordVisibility = React.useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setTimeout(() => {
        const textLength = (textInput.current as any).value.length;
        (textInput.current as any).setSelectionRange(textLength, textLength);
      }, 150);
    },
    []
  );

  const isPasswordField = props.type === 'password';

  const passwordVisibilityButton = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickPasswordVisibility}
        onMouseDown={handleMouseDownPassword}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <TextField
      {...props}
      error={showError}
      helperText={showError ? error : props.helperText}
      type={showPassword ? 'text' : props.type}
      inputRef={textInput}
      InputProps={{
        ...(props.InputProps || {}),
        ...(isPasswordField ? { endAdornment: passwordVisibilityButton } : {}),
      }}
    />
  );
};
