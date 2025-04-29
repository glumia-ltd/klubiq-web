import { Autocomplete, TextField, TextFieldProps } from '@mui/material'

export interface AutoCompleteProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  options: string[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  multiple?: boolean
  placeholder?: string
}

const AutoComplete = ({
  options,
  value,
  onChange,
  multiple = false,
  placeholder,
  ...props
}: AutoCompleteProps) => {
  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      value={value || (multiple ? [] : null)}
      onChange={(_, newValue) => {
        onChange?.(newValue || (multiple ? [] : ''))
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          placeholder={placeholder}
        />
      )}
    />
  )
}

export default AutoComplete 