import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { useState } from 'react'

interface ControlledPasswordFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  control: Control<T>
  name: Path<T>
}

const ControlledPasswordField = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledPasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          type={showPassword ? 'text' : 'password'}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  )
}

export default ControlledPasswordField 