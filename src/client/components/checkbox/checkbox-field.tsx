import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';

export const CheckboxField = ({
  error,
  label,
  helperText,
  ...props
}: CheckboxProps & {
  label?: string;
  helperText?: string | React.ReactElement;
  error?: string | React.ReactElement;
}) => {
  const showError = !!error;
  const showHelperText = !!helperText || showError;

  return (
    <>
      <FormControlLabel control={<Checkbox {...props} />} label={label} />
      {showHelperText && (
        <FormHelperText id={`${props.id}-helper-text`} error={showError}>
          {showError ? error : helperText}
        </FormHelperText>
      )}
    </>
  );
};
