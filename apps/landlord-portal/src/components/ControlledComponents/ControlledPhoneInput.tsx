import React from 'react';
import { TextField, Stack, Typography } from '@mui/material';
import ReactPhoneInput from 'react-phone-input-material-ui';
import {get} from "lodash-es"
// const styles = (theme: any) => ({
//   field: {
//     height: '100%',
//   },
//   countryList: {
//   },
// });

type ControlledPhoneInputProps = {
  formik: any;
  sx?: any;
  classes: any;
  InputProps?: any;
  disableOnChange?: boolean;
  label?: string;
  name: string;
  type?: string;
  inFieldLabel?: boolean;
  inputProps?: any;
  prioritizeError?: any;
  value?: any;
}

const ControlledPhoneInput: React.FC<ControlledPhoneInputProps> = ({
  formik,
  sx,
  classes,
  InputProps,
  disableOnChange,
  label,
  name,
  type,
  inFieldLabel,
  inputProps,
  prioritizeError,
  ...props
}) => {
  // const theme = useTheme();
  const handleChange = (value: string) => {
    formik.handleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        minWidth: 230,
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
      <ReactPhoneInput
        component={TextField}
        inputProps={{
          variant: 'outlined',
          label: undefined,
          size: 'small',
          id: name,
          name,
          fullWidth: true,
          autoComplete: 'new-password',
          error:
            Boolean(prioritizeError) ||
            (Boolean(get(formik.touched, name)) && Boolean(get(formik.errors, name))),
          helperText:
            prioritizeError ||
            (get(formik.touched, name) && get(formik.errors, name)) ||
            ' ',
          sx: {
            'MuiOutlinedInput-input *': {
              bgcolor: 'red!important',
            },
            '&.form-control': {
              height: '40px!important',
              width: '100%!important',
              paddingLeft: '39px!important',
              '& .MuiOutlinedInput-input': {
                boxSizing: 'content-box !important',
              },
            },
          },
        }}
        placeholder={''}
        // defaultCountry={'ng'}
        inputClass={classes.field}
        value={props.value || get(formik.values, name)}
        onChange={disableOnChange ? undefined : handleChange}
        defaultMask={'... .... .... ...'}
        {...props}
      />
    </Stack>
  );
};

export default (ControlledPhoneInput);

