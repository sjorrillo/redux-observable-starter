import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useField } from 'formik';
import React, { useState, useRef } from 'react';

export const TextboxField = (props: TextFieldProps) => {
  const [field, meta] = useField(props as any);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const textInput = useRef();
  const showError = !!(meta.touched && meta.error);

  const handleClickPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTimeout(() => {
      const textLength = (textInput.current as any).value.length;
      (textInput.current as any).setSelectionRange(textLength, textLength);
    }, 150);
  };

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
      {...field}
      {...props}
      error={showError}
      helperText={showError ? meta.error : props.helperText}
      type={showPassword ? 'text' : props.type}
      InputProps={{
        ...(props.InputProps || {}),
        ...(isPasswordField ? { endAdornment: passwordVisibilityButton } : {}),
        inputRef: textInput,
      }}
    />
  );
};
