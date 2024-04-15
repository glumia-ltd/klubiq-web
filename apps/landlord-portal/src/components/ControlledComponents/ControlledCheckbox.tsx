/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Stack,
  FormHelperText,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { SxProps } from "@mui/material";

type ControlledCheckBoxProps = {
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

const ControlledCheckBox: React.FC<ControlledCheckBoxProps> = ({
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
 
  return (
    <Stack
      sx={{
        minWidth: 150,
        flexDirection: "column",
        ...sx,
      }}
    >
      
      <FormControl
        required
        error={(formik.touched[name] && formik.errors[name]) || ' '}
        variant="standard"
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={props.value || formik.values[name]}
              onChange={!disableOnChange ? formik.handleChange : undefined}
              name={name}
              id={name}
            />
          }
          label={label}
          labelPlacement="end"
          sx={{ mx: 0 }}
          componentsProps={{
            typography: {
              fontSize: 15,
              fontWeight: 500,
            },
          }}
        />
        <FormHelperText>
          {(formik.touched[name] && formik.errors[name]) || ""}
        </FormHelperText>{" "}
      </FormControl>
    </Stack>
  );
};

export default ControlledCheckBox;