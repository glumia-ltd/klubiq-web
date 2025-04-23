import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { Preview } from '@storybook/react'
import { theme } from '../src/theme'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview 