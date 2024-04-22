/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  FormControl,
  InputLabel,
  Autocomplete,
  MenuItem,
  FormHelperText,
  Stack,
  Typography,
  TextField,
  SxProps,
} from '@mui/material';

type ControlledAutocompleteProps = {
  formik: any;
  sx?: SxProps;
  label: string;
  name: string;
  disableOnChange?: boolean;
  options: { value: any; label: string }[];
  inFieldLabel?: boolean;
  [key: string]: any;
};

const ControlledAutocomplete: React.FC<ControlledAutocompleteProps> = ({
  formik,
  sx,
  label,
  name,
  disableOnChange,
  options,
  inFieldLabel,
  ...props
}) => {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        m: 0.2,
        minWidth: 230,
        ...sx,
      }}
      spacing={1.2}
    >
      {!inFieldLabel && (
        <Typography fontWeight={500} fontSize={'16px'}>
          {label}
        </Typography>
      )}
      <FormControl
        sx={{ m: 1, minWidth: 230 }}
        variant='outlined'
        fullWidth
        error={formik.touched[name] && Boolean(formik.errors[name])}
      >
        {inFieldLabel && <InputLabel>{label}</InputLabel>}

        <Autocomplete
          id={props.name}
          size='small'
          autoHighlight
          autoComplete
          autoSelect
          value={formik.values[name]}
          onChange={(_, newValue) => {
            !disableOnChange
              ? formik.handleChange({
                  target: {
                    name,
                    value: newValue && newValue.value,
                    id: name,
                  },
                })
              : undefined;
          }}
          isOptionEqualToValue={(option, value) => option.value === value}
          options={options}
          getOptionLabel={(value) => {
            if (typeof value === 'string') {
              const option = options.find((option) => option.value === value);
              return option?.label || '';
            } else {
              return value.label;
            }
          }}
          renderOption={(props, option) => (
            <MenuItem {...props}>{option.label}</MenuItem>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              label={inFieldLabel && label}
              error={formik.touched[name] && Boolean(formik.errors[name])}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
          {...props}
        />
        {formik.touched[name] && (
          <FormHelperText>{formik.errors[name]}</FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
};

export default ControlledAutocomplete;
