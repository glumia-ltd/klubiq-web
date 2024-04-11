/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Stack, SxProps, TextField, } from '@mui/material';

type ControlledPinFieldProps = {
  formik: any;
  sx?: SxProps;
  label?: string;
  name: string;
  type?: string;
  inFieldLabel?: string;
  length?: number;
  validate?: any;
  [key: string]: any;
};

const ControlledPinField: React.FC<ControlledPinFieldProps> = ({
  formik,
  sx,
  // label,
  name,
  type,
  // inFieldLabel,
  // length,
  // validate,
  ...props
}) => {
  const InputProps = {
    // Add any custom input props here
  };

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        minWidth: 4,
        m: 1,
        ...sx,
      }}
      direction="row"
      spacing={0.5}
    >
      <TextField
        fullWidth
        id={name}
        name={name}
        variant="outlined"
        type={type || 'text'}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        InputProps={InputProps}
        helperText={(formik.touched[name] && formik.errors[name]) || ' '}
        {...props}
      />

    </Stack>
  );
};

export default ControlledPinField;

