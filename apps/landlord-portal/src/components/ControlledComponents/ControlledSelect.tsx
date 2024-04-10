import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Stack, Typography, InputAdornment, CircularProgress } from '@mui/material';
import { get } from 'lodash-es';

type ControlledSelectProps {
  loading?: boolean;
  formik: any;
  sx?: any;
  label: string;
  name: string;
  disableOnChange?: boolean;
  options: { value: any; label: string }[];
  inFieldLabel?: boolean;
  [key: string]: any;
}

const ControlledSelect: React.FC<ControlledSelectProps> = ({
  loading,
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
        m: 1,
        minWidth: 230,
        ...sx,
      }}
      spacing={0.5}
    >
      {!inFieldLabel && (
        <Typography fontWeight={500} fontSize={'0.85rem'}>
          {label}
        </Typography>
      )}
      <FormControl
        sx={{ minWidth: 230 }}
        variant="outlined"
        fullWidth
        error={Boolean(get(formik.touched, name)) && Boolean(get(formik.errors, name))}
        {...props}
      >
        {inFieldLabel && <InputLabel>{label}</InputLabel>}

        <Select
          name={name}
          size="small"
          id={name}
          value={props.value || get(formik.values, name)}
          onChange={!disableOnChange ? formik.handleChange : undefined}
          MenuProps={{ sx: {
            maxHeight: 'calc(100% - 200px)',
          } }}
        >
          {options.map(({ value, label }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {(get(formik.touched, name) && get(formik.errors, name)) || ' '}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default ControlledSelect;

