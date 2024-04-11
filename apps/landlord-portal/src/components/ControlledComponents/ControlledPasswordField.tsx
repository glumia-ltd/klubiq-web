import React, { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import ControlledTextField from './ControlledTextField';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

interface ControlledPasswordFieldProps extends React.ComponentProps<typeof ControlledTextField> {
  InputProps?: React.ComponentProps<typeof InputAdornment>;
}

const ControlledPasswordField: React.FC<ControlledPasswordFieldProps> = ({
  InputProps,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <ControlledTextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment>
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ControlledPasswordField;

