import React from 'react';
import { TextField, Stack, Typography, InputAdornment, CircularProgress } from '@mui/material';
import { get } from 'lodash-es';

type ControlledTextFieldProps {
  loading?: boolean;
  formik: any;
  sx?: any;
  InputProps?: any;
  disableOnChange?: boolean;
  label?: string;
  name: string;
  type?: string;
  inFieldLabel?: boolean;
  inputProps?: any;
  prioritizeError?: any;
  onFileSelect?: (files: File[]) => void;
  [key: string]: any;
}

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
        m: 1,
        flexDirection: 'column',
        ...sx,
      }}
      spacing={0.5}
    >
      {!inFieldLabel && (
        <Typography fontWeight={500} fontSize={'0.85rem'}>
          {label}
        </Typography>
      )}
      <TextField
        fullWidth
        id={name}
        name={name}
        size="small"
        variant="outlined"
        label={inFieldLabel && label}
        type={type || 'text'}
        value={(props.value !== undefined && props.value) || get(formik.values, name)}
        onChange={onChange}
        error={
          Boolean(prioritizeError) ||
          (Boolean(get(formik.touched, name)) && Boolean(get(formik.errors, name)))
        }
        InputProps={{
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : undefined,
          ...InputProps,
        }}
        helperText={
          prioritizeError ||
          (get(formik.touched, name) && get(formik.errors, name)) ||
          ' '
        }
        inputProps={inputProps}
        {...props}
      />
    </Stack>
  );
};

export default ControlledTextField;

