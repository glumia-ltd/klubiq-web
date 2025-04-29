import { Box, Menu, MenuItem, TextField } from '@mui/material'
import { useState } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface FilterProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  disabled?: boolean
}

const Filter = ({
  options,
  value,
  onChange,
  label = 'Filter',
  placeholder = 'Select an option',
  disabled = false,
}: FilterProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue)
    handleClose()
  }

  const selectedOption = options.find((option) => option.value === value)

  return (
    <Box>
      <TextField
        label={label}
        value={selectedOption?.label || ''}
        placeholder={placeholder}
        disabled={disabled}
        onClick={handleClick}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: '100%', maxWidth: '360px' },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default Filter 