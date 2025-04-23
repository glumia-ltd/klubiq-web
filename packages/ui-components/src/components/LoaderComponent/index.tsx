import { CircularProgress, Box, BoxProps } from '@mui/material'

interface LoaderComponentProps extends BoxProps {
  size?: number
  color?: 'primary' | 'secondary' | 'inherit'
  thickness?: number
}

const LoaderComponent = ({
  size = 40,
  color = 'primary',
  thickness = 3.6,
  ...boxProps
}: LoaderComponentProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100px"
      {...boxProps}
    >
      <CircularProgress
        size={size}
        color={color}
        thickness={thickness}
      />
    </Box>
  )
}

export default LoaderComponent 