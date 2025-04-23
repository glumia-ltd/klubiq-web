import { Box, BoxProps, useTheme, useMediaQuery } from '@mui/material'

export interface ViewPortProps extends Omit<BoxProps, 'maxWidth'> {
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
}

export const ViewPort = ({ children, maxWidth = 'lg', centered = true, ...props }: ViewPortProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: maxWidth,
        mx: centered ? 'auto' : undefined,
        px: isMobile ? 2 : 4,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default ViewPort 