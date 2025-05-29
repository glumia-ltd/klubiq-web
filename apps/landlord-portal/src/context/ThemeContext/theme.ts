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
const primaryColors = {
	mainBlue: '#002147',
	lightBlue: '#005CFF',
	white: '#FFFFFF',
	black: '#000000',
}
const secondaryColors = {
	yellow: '#FFD700',
	blue: '#6699CC',
	lightBlue: '#E2EAF2',
}
const backgroundColors = {
	light: '#F3F6F8',
	dark: '#1B1B1B',
}
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
	spacing: 8,
	palette: {
		mode: 'light',
		primary: {
			main: primaryColors.mainBlue,
			light: primaryColors.lightBlue,
			dark: primaryColors.mainBlue,
			contrastText: primaryColors.black, 
		},
		secondary: {
			main: secondaryColors.yellow,
			light: secondaryColors.blue,
			dark: backgroundColors.dark,
			contrastText: primaryColors.black,
		},
		background: {
			default: backgroundColors.light,
			paper: backgroundColors.light,
		},
		notification: {
			light: primaryColors.mainBlue,
		},
		buttonColors: {
			common: {
				// color:
			},
		},
		// error:{},
		// warning:{},
		// info:{},
		// success:{},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					background: backgroundColors.light,
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
					display: 'flex',
					fontWeight: 'semi-bold',
					padding: '0.5rem 1rem',
					borderRadius: '10px',
					gap: '0.5rem',
					textTransform: 'capitalize',
				},
				outlined: {
					borderColor: primaryColors.mainBlue,
					color: primaryColors.mainBlue,
					opacity: '0.8',
					'&:hover': {
						opacity: '1',
						color: primaryColors.mainBlue,
						border: '1.6px solid #002147',
					},
				},
			},
			variants: [
				{
					props: { variant: 'klubiqMainButton' },
					style: {
						background: primaryColors.mainBlue,
						color: primaryColors.white,
						'&:hover': {
							cursor: 'pointer',
							color: backgroundColors.light,
							background: secondaryColors.blue,
						},
						'&:disabled': {
							opacity: '1',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

						},
					},
				},
				{
					props: { variant: 'klubiqSecondaryButton' },
					style: {
						background:secondaryColors.blue, 
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							background:primaryColors.mainBlue,
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

						},
					},
				},
				{
					props: { variant: 'klubiqTertiaryButton' },
					style: {
						background:'#0088F0', 
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: secondaryColors.lightBlue,
							background:backgroundColors.dark,
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

						},
					},
				},
				{
					props: { variant: 'klubiqAccentButton' },
					style: {
						background:'#0088F0', 
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: '#0D0D0D',
							background:backgroundColors.dark,
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

						},
					},
				},
				{
					props: { variant: 'klubiqTextButton' },
					style: {
						color: backgroundColors.dark,
						'&:hover': {
							cursor: 'pointer',
							color: backgroundColors.dark,
							background:'rgba(226, 234, 242, 0.6)',
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',

						},
					},
				},
				{
					props: { variant: 'klubiqOutlinedButton' },
					style: {
						color: backgroundColors.dark,
						border: '1px solid #1B1B1B',
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: backgroundColors.dark,
							background:'rgba(226, 234, 242, 0.6)',
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

						},
					},
				},
				{
					props: { variant: 'filterButton' },
					style: {
						display: 'flex',
						color: primaryColors.mainBlue,
						gap: '8px',
						padding: '8px',
						borderRadius: '8px',
						outline: '1px dashed #002147',
					},
				},
				{
					props: { variant: 'borderlessFilterButton' },
					style: {
						color: primaryColors.mainBlue,
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
					backgroundColor: primaryColors.white,
					color: backgroundColors.dark,
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
					background: primaryColors.mainBlue,
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
					color: primaryColors.white,
				},
			},
		},

		MuiListItemText: {
			styleOverrides: {
				root: {
					color: primaryColors.white,
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
					background: primaryColors.white,
					//boxShadow: '0px 0px 25px 0px rgba(211, 217, 223, 0.25)',
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
						backgroundColor: primaryColors.white,
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
						backgroundColor: primaryColors.lightBlue,
						color: primaryColors.white,
					},
				},
				{
					props: { variant: 'sale' },
					style: {
						backgroundColor: '#FF0000',
						color: primaryColors.white,
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
	spacing: 8,
	palette: {
		mode: 'dark',
		primary: {
			main: '#0088F0',
			light: primaryColors.lightBlue,
			dark: primaryColors.mainBlue,
			contrastText: primaryColors.white,
		},
		secondary: {
			main: secondaryColors.yellow,
			light: secondaryColors.blue,
			dark: backgroundColors.dark,
			contrastText: primaryColors.white,
		},
		notification: {
			light: '#B8D9FF',
		},

		background: {
			// default: '#0D0D0D',
			// paper: '#0D0D0D',
			default: backgroundColors.dark,
			paper: backgroundColors.dark,
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
					color: primaryColors.white,
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
					color: primaryColors.white,
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					color: primaryColors.white,
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
					background: '#161616',
					backgroundImage: 'none',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: primaryColors.white,
					display: 'flex',
					fontWeight: 'semi-bold',
					padding: '0.5rem 1rem',
					borderRadius: '10px',
					gap: '0.5rem',
					textTransform: 'capitalize',
				},
				outlined: {
					borderColor: primaryColors.white,
					color: primaryColors.white,
					opacity: '0.3',
					'&:hover': {
						opacity: '1',
						color: primaryColors.white,
						border: '1.6px solid #FFFFFF',
					},
				}
			},
			variants: [
				{
					props: { variant: 'klubiqMainButton' },
					style: {
						background:'#0088F0', 
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: '#0D0D0D',
							background:secondaryColors.blue,
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

						},
					},
				},
				{
					props: { variant: 'klubiqSecondaryButton' },
					style: {
						background:secondaryColors.blue, 
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: backgroundColors.dark,
							background:secondaryColors.lightBlue,
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

						},
					},
				},
				{
					props: { variant: 'klubiqTertiaryButton' },
					style: {
						background:'#0088F0', 
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: '#0D0D0D',
							background:secondaryColors.blue,
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

						},
					},
				},

				{
					props: { variant: 'klubiqAccentButton' },
					style: {
						background:'#0088F0', 
						color: primaryColors.white,
						opacity: '1',
						display: 'flex',
						fontWeight: 'semi-bold',
						padding: '0.5rem 1rem',
						borderRadius: '10px',
						gap: '8px',
						textTransform: 'capitalize',
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: '#0D0D0D',
							background:secondaryColors.blue,
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

						},
					},
				},
				{
					props: { variant: 'klubiqTextButton' },
					style: {
						color: secondaryColors.lightBlue,
						'&:hover': {
							//opacity: '0.5',
							cursor: 'pointer',
							color: backgroundColors.dark,
							background:'rgba(226, 234, 242, 0.6)',
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',

						},
					},
				},
				{
					props: { variant: 'klubiqOutlinedButton' },
					style: {
						color: secondaryColors.lightBlue,
						border: '1px solid #E2EAF2',
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: backgroundColors.dark,
							background:'rgba(226, 234, 242, 0.6)',
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							boxShadow: 'none',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',

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
					//boxShadow: '0px 0px 25px 0px rgba(211, 217, 223, 0.25)',
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
		MuiChip: {
			variants: [
				{
					props: { variant: 'rent' },
					style: {
						backgroundColor: primaryColors.lightBlue,
						color: primaryColors.white,
					},
				},
				{
					props: { variant: 'sale' },
					style: {
						backgroundColor: '#FF0000',
						color: primaryColors.white,
					},
				},
				{
					props: { variant: 'propertyType' },
					style: {
						backgroundColor: primaryColors.white,
						color: primaryColors.mainBlue,
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
