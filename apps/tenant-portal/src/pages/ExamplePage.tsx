import { Typography, Box, Paper } from '@mui/material'
import { ViewPort } from '@klubiq/ui-components'

const ExamplePage = () => {
  return (
    <ViewPort>
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Tenant Portal
        </Typography>
        <Typography variant="body1" paragraph>
          This page demonstrates the use of the ViewPort component from our shared UI components library.
          The ViewPort component provides consistent spacing and width constraints across different screen sizes.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Paper sx={{ p: 2, flex: 1, minWidth: '200px' }}>
            <Typography variant="h6">Feature 1</Typography>
            <Typography variant="body2">
              This content is properly contained within the ViewPort component.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, minWidth: '200px' }}>
            <Typography variant="h6">Feature 2</Typography>
            <Typography variant="body2">
              The ViewPort ensures consistent spacing and responsive behavior.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, minWidth: '200px' }}>
            <Typography variant="h6">Feature 3</Typography>
            <Typography variant="body2">
              Content is centered and has appropriate padding on all screen sizes.
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </ViewPort>
  )
}

export default ExamplePage 