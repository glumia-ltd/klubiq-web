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
			dark: '#FF6400',
			contrastText: '#ffffff',
		},

		background: {
			default: '#ccdbee',
			paper: '#F3F6F8',
		},
	},
	components: {
		MuiListItemButton: {
			defaultProps: {
				disableTouchRipple: true,
			},
		},
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: '#FFFFFF',
					color: '#000000',
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
					background: '#ffffff',
					color: '#000000 !important',
				},
			},
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
		},

		button: {
			textTransform: 'none',
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
			main: '#0D0D0D',
			dark: '#FF6400',
			light: '#BBD9FF',
		},

		background: {
			default: '#ccdbee',
			paper: '#0D0D0D',
		},
	},

	components: {
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
					color: '#FFFFF',
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
					background: '#0DODOD',
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
					// '&.Mui-disabled': {
					//     background: grey[100],
					// }
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: '#FFFFFF',
					// '&.Mui-disabled': {
					//     background: grey[100],
					// }
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					background: '#161616',
					boxShadow: '0px 0px 25px 0px rgba(211, 217, 223, 0.25)',

					// '&.Mui-disabled': {
					//     background: grey[100],
					// }
				},
			},
		},
	},

	typography: {
		fontFamily: 'Maven Pro, sans-serif',
		// allVariants: {
		// 	color: "#BBD9FF"
		//   },
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
			// fontSize: '1rem',
			// lineHeight: 1,
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
	},
	transitions: transitionsTheme,
});
