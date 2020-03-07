import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useField } from 'formik';
import React from 'react';

export const CheckboxField = ({ label, ...props }: CheckboxProps & { label?: string }) => {
  const [field, meta] = useField(props as any);
  const showError = !!(meta.touched && meta.error);
  return (
    <>
      <FormControlLabel control={<Checkbox {...field} {...props} />} label={label} />
      {showError && <FormHelperText error>This is a test</FormHelperText>}
    </>
  );
};
