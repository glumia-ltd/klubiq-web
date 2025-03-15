import { Theme, createTheme } from '@mui/material';
const transitionsTheme = {
	duration: {
		shortest: 150,
		shorter: 200,
		short: 250,
		// most basic recommended timing
		standard: 300,
		// this is to be used in complex animations
		complex: 375,
		// recommended when something is entering screen
		enteringScreen: 400,
		// recommended when something is leaving screen
		leavingScreen: 300,
	},
	easing: {
		// This is the most common easing curve.
		easeInOut: 'ease-in-out',
		// Objects enter the screen at full velocity from off-screen and
		// slowly decelerate to a resting point.
		easeOut: 'ease-out',
		// Objects leave the screen at full velocity. They do not decelerate when off-screen.
		easeIn: 'ease-in',
		// The sharp curve is used by objects that may return to the screen at any time.
		sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
	},
};
const cardHeaderStyle = {
	fontWeight: 600,
	fontSize: '0.875rem',
	lineHeight: 1.5,
};
const cardContentTextStyle = {
	fontWeight: 400,
	fontSize: '0.75rem',
	lineHeight: 1,
};
const cardTitleStyle = {
	fontWeight: 700,
	fontSize: '1rem',
	lineHeight: 2,
};
const filterResultTextStyle = {
	fontSize: '1.125rem',
	fontWeight: 700,
};
const filterResultCountStyle = {
	fontSize: '3rem',
	fontWeight: 700,
	lineHeight: '2.375rem',
};
export const LightTheme: Theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},

	palette: {
		mode: 'light',
		primary: {
			main: '#002147',
			light: '#0096FF',
			dark: '#1F305E',
			contrastText: '#FFFFFF',
		},
		secondary: {
			main: '#FFD700',
			light: '#6699CC',
			dark: '#1b1b1b',
			contrastText: '#ffffff',
		},
		background: {
			default: '#F3F6F8',
			paper: '#F3F6F8',
		},
		notification: {
			light: '#002147',
		},
		buttonColors: {
			common: {
				// color:
			},
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					background: '#F3F6F8',
					height: '100%',
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					color: '#FFFFFF !important',
				},
			},
		},

		MuiButton: {
			styleOverrides: {
				root: {
					// color: '#002147',
					// '&.Mui-disabled': {
					//     background: grey[100],
					// }
				},
				outlined: {
					borderColor: '#002147',
					color: '#002147',
					opacity: '0.8',
					'&:hover': {
						opacity: '1',
						color: '#002147',
						border: '1.6px solid #002147',
					},
				},

				// contained: {
				// 	color: '#ffffff',
				// 	borderColor: '#002147',
				// },
			},

			variants: [
				{
					props: { variant: 'propertyButton' },
					style: {
						background: '#ffffff',
						color: '#002147',
						opacity: '0.8',
						'&:hover': {
							// opacity: '1',
							color: '#002147',
							// border: '1.6px solid #FFFFFF',
						},
					},
				},

				{
					props: { variant: 'filterButton' },
					style: {
						display: 'flex',
						color: '#002147',
						gap: '8px',
						padding: '8px',
						borderRadius: '8px',
						outline: '1px dashed #002147',
					},
				},
				{
					props: { variant: 'borderlessFilterButton' },
					style: {
						color: '#002147',
						padding: '0',
						outline: 'none',
						display: 'flex',
						gap: '5px',
						'&:hover': {
							background: 'none',
						},
					},
				},
			],
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					maxHeight: 'calc(100% - 200px)',
				},
			},
		},
		MuiListItemButton: {
			defaultProps: {
				disableTouchRipple: true,
			},
		},
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: '#FFFFFF',
					color: '#1B1B1B',
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				docked: {
					maxWidth: '250px',
					minWidth: '100px',
				},
				paper: {
					display: 'flex',
					background: '#002147',
					alignItems: 'center',
					maxWidth: '250px',
					minWidth: '100px',
					overflowX: 'hidden',
					msOverflowY: 'auto',
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: '#FFFFFF',
				},
			},
		},

		MuiListItemText: {
			styleOverrides: {
				root: {
					color: '#FFFFFF',
					fontSize: '1.5rem',
				},
			},
		},

		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					background: 'white',
					height: '2.7rem',
					borderRadius: '0.5rem',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					//background: '#ffffff',
					color: '#1B1B1B !important',
				},
			},
		},

		MuiCard: {
			styleOverrides: {
				root: {
					background: '#ffffff',
					boxShadow: '0px 0px 25px 0px rgba(211, 217, 223, 0.25)',
				},
			},

			variants: [
				{
					props: { variant: 'expired' },
					style: {
						backgroundColor: '#D9D9D9B2',
					},
				},
				{
					props: { variant: 'overdue' },
					style: {
						backgroundColor: '#FF00001A',
					},
				},
				{
					props: { variant: 'active' },
					style: {
						backgroundColor: '#FFFFFF',
					},
				},
			],
		},

		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiButtonGroup: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiStep: {
			styleOverrides: {
				root: {
					padding: '0px',
					fontWeight: '100',
				},
			},
		},
		MuiChip: {
			variants: [
				{
					props: { variant: 'rent' },
					style: {
						backgroundColor: '#0096FF',
						color: '#FFFFFF',
					},
				},
				{
					props: { variant: 'sale' },
					style: {
						backgroundColor: '#FF0000',
						color: '#FFFFFF',
					},
				},
				{
					props: { variant: 'propertyType' },
					style: {
						backgroundColor: '#0C36A01A',
						color: '#0C36A0',
					},
				},
			],
		},
	},
	typography: {
		fontFamily: 'Maven Pro, sans-serif',
		h1: {
			fontWeight: 600,
			fontSize: '3rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h2: {
			fontWeight: 600,
			fontSize: '2.25rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h3: {
			fontWeight: 600,
			fontSize: '2rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h4: {
			fontWeight: 600,
			fontSize: '1.5rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h5: {
			fontWeight: 500,
			fontSize: '2rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h6: {
			fontWeight: 600,
			fontSize: '1rem',
			lineHeight: 1,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h7: {
			fontWeight: 500,
			fontSize: '1.1rem',
			lineHeight: 1,
			fontFamily: 'Maven Pro, sans-serif',
		},
		body1: {
			fontWeight: 400,
			fontSize: '1rem',
			lineHeight: 1,
			fontFamily: 'Maven Pro, sans-serif',
		},
		body2: {
			fontWeight: 600,
			fontSize: '14px',
			lineHeight: '20px',
			fontFamily: 'Maven Pro, sans-serif',
		},
		subtitle1: {
			fontWeight: 500,
			fontSize: '1rem',
			lineHeight: 1.75,
			fontFamily: 'Maven Pro, sans-serif',
			letterSpacing: 0,
		},
		subtitle2: {
			fontWeight: 500,
			fontSize: '0.875rem',
			lineHeight: 1.75,
			fontFamily: 'Maven Pro, sans-serif',
			letterSpacing: 0,
		},

		caption: {
			fontWeight: 400,
			fontSize: '0.75rem',
			lineHeight: 1.6,
			fontFamily: 'Maven Pro, sans-serif',
			letterSpacing: 0,
		},
		overline: {
			fontWeight: 600,
			fontSize: '0.75rem',
			lineHeight: 2.46,
			fontFamily: 'Maven Pro, sans-serif',
			letterSpacing: '1px',
			textTransform: 'uppercase',
		},
		dashboardTypography: {
			fontWeight: 800,
			// fontSize: '1rem',
			// lineHeight: 1,
			fontFamily: 'Maven Pro, sans-serif',
			fontSize: '1rem',
		},
		button: {
			textTransform: 'none',
		},
		link: {
			textTransform: 'none',
			fontWeight: 600,
			fontSize: '1rem',
			textDecoration: 'underline',
			cursor: 'pointer',
			pointerEvents: 'auto',
		},
		cardHeader: {
			...cardHeaderStyle,
		},
		cardContentText: {
			...cardContentTextStyle,
		},

		cardTitle: {
			...cardTitleStyle,
		},
		filterResultText: {
			...filterResultTextStyle,
		},
		filterResultNumber: {
			...filterResultCountStyle,
		},
	},
	transitions: transitionsTheme,
});

export const DarkTheme: Theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},

	palette: {
		mode: 'dark',
		primary: {
			main: '#0088F0',
			light: '#0096FF',
			dark: '#1F305E',
		},
		secondary: {
			main: '#FFD700',
			light: '#6699CC',
			dark: '#1b1b1b',
			contrastText: '#ffffff',
		},
		notification: {
			light: '#B8D9FF',
		},

		background: {
			default: '#0D0D0D',
			paper: '#0D0D0D',
		},
	},

	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					background:'#0D0D0D',
					height: '100%',
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					color: '#FFFFFF !important',
				},
			},
		},
		MuiListItemButton: {
			defaultProps: {
				disableRipple: true,
			},
		},

		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
				disableTouchRipple: true,
			},
		},
		MuiButtonGroup: {
			defaultProps: {
				disableRipple: true,
			},
		},

		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					background: '#0D0D0D',
					color: '#FFFFFF',
					boxShadow: '0px 0px 0px 1px #6699CC',
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				docked: {
					maxWidth: '250px',
					minWidth: '100px',
				},
				paper: {
					display: 'flex',
					background: '#OFOFOF',
					alignItems: 'center',
					maxWidth: '250px',
					minWidth: '100px',
					overflowX: 'hidden',
					msOverflowY: 'auto',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					background: '#0F0F0F',
					height: '2.7rem',
					borderRadius: '0.5rem',
					// '&.Mui-disabled': {
					//     background: grey[100],
					// }
					color: '#FFFFFF',
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					color: '#FFFFFF',
					fontSize: '1.5rem',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					//background: '#0DODOD',
					// '&.Mui-disabled': {
					//     background: grey[100],
					// }
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					background: '#0DODOD',
					backgroundImage: 'none',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: '#FFFFFF',
				},
				outlined: {
					borderColor: '#FFFFFF',
					color: '#FFFFFF',
					opacity: '0.3',
					'&:hover': {
						opacity: '1',
						color: '#FFFFFF',
						border: '1.6px solid #FFFFFF',
					},
				},
				// contained: {
				// 	backgroundColor: '#B8D9FF',
				// 	borderColor: '#B8D9FF',
				// 	color: '#1B1B1B',
				// 	'&:hover': {
				// 		color: '#FFFFFF',
				// 	},
				// },
			},
			variants: [
				{
					props: { variant: 'propertyButton' },
					style: {
						background: '#ffffff',
						color: '#0088F0',

						'&:hover': {
							color: '#0088F0',
						},
					},
				},

				{
					props: { variant: 'filterButton' },
					style: {
						display: 'flex',
						gap: '8px',
						padding: '8px',
						borderRadius: '8px',
						outline: '1px dashed #E4E4E4',
					},
				},
				{
					props: { variant: 'borderlessFilterButton' },
					style: {
						color: '#E4E4E4',
						padding: '0',
						outline: 'none',
						display: 'flex',
						gap: '5px',
						'&:hover': {
							background: 'none',
						},
					},
				},
			],
		},

		MuiCard: {
			styleOverrides: {
				root: {
					background: '#161616',
					boxShadow: '0px 0px 25px 0px rgba(211, 217, 223, 0.25)',
					border: '1px solid rgba(211, 217, 223, 0.25)',
				},
			},
			variants: [
				{
					props: { variant: 'expired' },
					style: {
						backgroundColor: '#D9D9D9B2',
					},
				},
				{
					props: { variant: 'overdue' },
					style: {
						backgroundColor: '#FF00001A',
					},
				},
				{
					props: { variant: 'active' },
					style: {
						background: '#161616',
					},
				},
			],
		},
	},

	typography: {
		fontFamily: 'Maven Pro, sans-serif',
		h1: {
			fontWeight: 600,
			fontSize: '3rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h2: {
			fontWeight: 600,
			fontSize: '2.25rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},

		h3: {
			fontWeight: 600,
			fontSize: '2rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h4: {
			fontWeight: 600,
			fontSize: '1.5rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h5: {
			fontWeight: 500,
			fontSize: '2rem',
			lineHeight: 1.5,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h6: {
			fontWeight: 800,
			fontSize: '1rem',
			lineHeight: 1,
			fontFamily: 'Maven Pro, sans-serif',
		},
		h7: {
			fontWeight: 500,
			fontSize: '1.1rem',
			lineHeight: 1,
			fontFamily: 'Maven Pro, sans-serif',
		},

		body1: {
			fontWeight: 400,
			fontSize: '1rem',
			lineHeight: 1,
			fontFamily: 'Maven Pro, sans-serif',
		},
		body2: {
			fontWeight: 600,
			fontSize: '14px',
			lineHeight: '20px',
			fontFamily: 'Maven Pro, sans-serif',
		},
		subtitle1: {
			fontWeight: 500,
			fontSize: '1rem',
			lineHeight: 1.75,
			fontFamily: 'Maven Pro, sans-serif',
			letterSpacing: 0,
		},
		subtitle2: {
			fontWeight: 500,
			fontSize: '0.875rem',
			lineHeight: 1.75,
			fontFamily: 'Maven Pro, sans-serif',
			letterSpacing: 0,
		},

		caption: {
			fontWeight: 400,
			fontSize: '0.75rem',
			lineHeight: 1.6,
			fontFamily: 'Maven Pro, sans-serif',
			letterSpacing: 0,
		},
		overline: {
			fontWeight: 600,
			fontSize: '0.75rem',
			lineHeight: 2.46,
			fontFamily: 'Maven Pro, sans-serif',
			letterSpacing: '1px',
			textTransform: 'uppercase',
		},
		dashboardTypography: {
			fontWeight: 800,
			// fontSize: '1rem',
			// lineHeight: 1,
			fontFamily: 'Maven Pro, sans-serif',
			color: '#BBD9FF',
		},
		button: {
			textTransform: 'none',
			disableRipple: true,
		},
		link: {
			textTransform: 'none',
			fontWeight: 600,
			fontSize: '1rem',
			textDecoration: 'underline',
			cursor: 'pointer',
			pointerEvents: 'auto',
		},
		cardHeader: {
			...cardHeaderStyle,
		},
		cardContentText: {
			...cardContentTextStyle,
		},
		cardTitle: {
			...cardTitleStyle,
		},
		filterResultText: {
			...filterResultTextStyle,
		},
		filterResultNumber: {
			...filterResultCountStyle,
		},
	},
	transitions: transitionsTheme,
});
