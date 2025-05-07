import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface ControlledTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  control: Control<T>
  name: Path<T>
}

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledTextFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  )
}

export default ControlledTextField 