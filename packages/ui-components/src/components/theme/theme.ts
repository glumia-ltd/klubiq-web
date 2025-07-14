import { Theme, createTheme } from '@mui/material';

const primaryColors = {
	mainBlue: '#002147',
	lightBlue: '#005CFF',
	white: '#FFFFFF',
	black: '#000000',
};
const secondaryColors = {
	yellow: '#FFD700',
	blue: '#6699CC',
	lightBlue: '#E2EAF2',
	klubiqGrey: '#64748B',
};
const backgroundColors = {
	light: '#F3F6F8',
	dark: '#1B1B1B',
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
		textColors: {
			greyText: secondaryColors.klubiqGrey,
		},

		buttonColors: {
			common: {
				// color:
			},
		},

		// warning:{},
		// info:{},
		// success:{},
	},
	components: {
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
						background: secondaryColors.blue,
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							background: primaryColors.mainBlue,
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
						background: '#0088F0',
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: secondaryColors.lightBlue,
							background: backgroundColors.dark,
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
						background: '#0088F0',
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: '#0D0D0D',
							background: backgroundColors.dark,
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
							background: 'rgba(226, 234, 242, 0.6)',
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
							background: 'rgba(226, 234, 242, 0.6)',
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
				{
					props: { variant: 'greenChip' },
					style: {
						backgroundColor: '#D1FADF',
						color: '#027A48',
					},
				},
				{
					props: { variant: 'pattensBlueChip' },
					style: {
						backgroundColor: '#E0E7FF',
						color: '#272179',
					},
				},
				{
					props: { variant: 'pippinRedChip' },
					style: {
						backgroundColor: '#FDF2F4',
						color: '#9F1239',
					},
				},
				{
					props: { variant: 'beesWaxYellowChip' },
					style: {
						backgroundColor: '#FEF3C7',
						color: '#92400E',
					},
				},
			],
		},
	},
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
				},
			},
			variants: [
				{
					props: { variant: 'klubiqMainButton' },
					style: {
						background: '#0088F0',
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: '#0D0D0D',
							background: secondaryColors.blue,
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
						background: secondaryColors.blue,
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: backgroundColors.dark,
							background: secondaryColors.lightBlue,
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
						background: '#0088F0',
						color: primaryColors.white,
						'&:hover': {
							opacity: '1',
							cursor: 'pointer',
							color: '#0D0D0D',
							background: secondaryColors.blue,
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
						background: '#0088F0',
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
							background: secondaryColors.blue,
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
							background: 'rgba(226, 234, 242, 0.6)',
						},
						'&:disabled': {
							opacity: '0.5',
							cursor: 'not-allowed',
							color: 'rgba(255, 255, 255, 0.3)',
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
							background: 'rgba(226, 234, 242, 0.6)',
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
	},

	// typography: {
	// 	fontFamily: 'Maven Pro, sans-serif',
	// 	h1: {
	// 		fontWeight: 600,
	// 		fontSize: '3rem',
	// 		lineHeight: 1.5,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 	},
	// 	h2: {
	// 		fontWeight: 600,
	// 		fontSize: '2.25rem',
	// 		lineHeight: 1.5,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 	},

	// 	h3: {
	// 		fontWeight: 600,
	// 		fontSize: '2rem',
	// 		lineHeight: 1.5,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 	},
	// 	h4: {
	// 		fontWeight: 600,
	// 		fontSize: '1.5rem',
	// 		lineHeight: 1.5,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 	},
	// 	h5: {
	// 		fontWeight: 500,
	// 		fontSize: '2rem',
	// 		lineHeight: 1.5,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 	},
	// 	h6: {
	// 		fontWeight: 800,
	// 		fontSize: '1rem',
	// 		lineHeight: 1,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 	},
	// 	h7: {
	// 		fontWeight: 500,
	// 		fontSize: '1.1rem',
	// 		lineHeight: 1,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 	},

	// 	body1: {
	// 		fontWeight: 400,
	// 		fontSize: '1rem',
	// 		lineHeight: 1,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 	},
	// 	body2: {
	// 		fontWeight: 600,
	// 		fontSize: '14px',
	// 		lineHeight: '20px',
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 	},
	// 	subtitle1: {
	// 		fontWeight: 500,
	// 		fontSize: '1rem',
	// 		lineHeight: 1.75,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 		letterSpacing: 0,
	// 	},
	// 	subtitle2: {
	// 		fontWeight: 500,
	// 		fontSize: '0.875rem',
	// 		lineHeight: 1.75,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 		letterSpacing: 0,
	// 	},

	// 	caption: {
	// 		fontWeight: 400,
	// 		fontSize: '0.75rem',
	// 		lineHeight: 1.6,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 		letterSpacing: 0,
	// 	},
	// 	overline: {
	// 		fontWeight: 600,
	// 		fontSize: '0.75rem',
	// 		lineHeight: 2.46,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 		letterSpacing: '1px',
	// 		textTransform: 'uppercase',
	// 	},
	// 	dashboardTypography: {
	// 		fontWeight: 800,
	// 		// fontSize: '1rem',
	// 		// lineHeight: 1,
	// 		fontFamily: 'Maven Pro, sans-serif',
	// 		color: '#BBD9FF',
	// 	},
	// 	button: {
	// 		textTransform: 'none',
	// 		disableRipple: true,
	// 	},
	// 	link: {
	// 		textTransform: 'none',
	// 		fontWeight: 600,
	// 		fontSize: '1rem',
	// 		textDecoration: 'underline',
	// 		cursor: 'pointer',
	// 		pointerEvents: 'auto',
	// 	},
	// 	cardHeader: {
	// 		...cardHeaderStyle,
	// 	},
	// 	cardContentText: {
	// 		...cardContentTextStyle,
	// 	},
	// 	cardTitle: {
	// 		...cardTitleStyle,
	// 	},
	// 	filterResultText: {
	// 		...filterResultTextStyle,
	// 	},
	// 	filterResultNumber: {
	// 		...filterResultCountStyle,
	// 	},
	// },
});
