import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Preview } from '@storybook/react';
import { LightTheme } from '../src/components/theme/theme';

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
			<ThemeProvider theme={LightTheme}>
				<CssBaseline />
				<Story />
			</ThemeProvider>
		),
	],
};

export default preview;
