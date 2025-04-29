import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface ControlledSelectProps<T extends FieldValues> extends Omit<SelectProps, 'name'> {
  control: Control<T>
  name: Path<T>
  options: {
    value: string | number
    label: string
  }[]
  label?: string
}

const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  options,
  label,
  ...props
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          {label && <InputLabel>{label}</InputLabel>}
          <Select
            {...field}
            {...props}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  )
}

export default ControlledSelect 