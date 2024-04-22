/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  TextField,
  Stack,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { SxProps } from '@mui/material';

type ControlledTextFieldProps = {
  loading?: boolean;
  formik: any;
  sx?: SxProps;
  InputProps?: any;
  disableOnChange?: boolean;
  label?: string;
  name: string;
  type?: string;
  inFieldLabel?: boolean;
  inputProps?: any;
  prioritizeError?: any;
  [key: string]: any;
};

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
  loading,
  formik,
  sx,
  InputProps,
  disableOnChange,
  label,
  name,
  type,
  inFieldLabel,
  inputProps,
  prioritizeError,
  onFileSelect,
  ...props
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disableOnChange) {
      return;
    }
    if (type === 'file') {
      onFileSelect?.(e.target.files);
    }
    formik.handleChange(e);
  };

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        minWidth: 150,
        m:0.1,
        flexDirection: 'column',
        ...sx,
      }}
      spacing={0.1}
    >
      {!inFieldLabel && (
      <Typography fontWeight={500} fontSize={'16px'}>
          {label}
        </Typography>
      )}
      <TextField
        fullWidth
        id={name}
        name={name}
        size='small'
        variant='outlined'
        label={inFieldLabel && label}
        type={type || 'text'}
        value={
          (props.value !== undefined && props.value) || formik.values[name]
        }
        onChange={onChange}
        error={
          Boolean(prioritizeError) ||
          (Boolean(formik.touched[name]) && Boolean(formik.errors[name]))
        }
        InputProps={{
          endAdornment: loading ? (
            <InputAdornment position='end'>
              <CircularProgress size={20} />
            </InputAdornment>
          ) : undefined,
          ...InputProps,
        }}
        helperText={
          prioritizeError ||
          (formik.touched[name] && formik.errors[name]) ||
          ' '
        }
        inputProps={inputProps}
        {...props}
      />
    </Stack>
  );
};

export default ControlledTextField;
