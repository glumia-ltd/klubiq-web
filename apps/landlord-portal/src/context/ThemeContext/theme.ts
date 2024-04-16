import { Theme, createTheme } from '@mui/material';

export const LightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#002147',
      light: '#0096FF',
      dark: '#1F305E',
    },
    secondary: {
      main: '#FFD700',
      dark: '#FF6400',
      contrastText: '#ffffff',
    },
    // primaryLight: {
    //   main: "#6699CC",
    //   dark: "#0C36A0",
    //   contrastText: "#ffffff",
    // },
    background: {
      default: '#ccdbee',
      paper: '#FFFFFF',
    },
    // blue: {
    //   main: "#002147",
    // },
    // black: {
    //   main: "#1B1B1B",
    // },
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
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: 'white',
          height: '2.7rem',
          borderRadius: '0.5rem',
          // '&.Mui-disabled': {
          //     background: grey[100],
          // }
        },
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          padding: '0rem!important',
          // '&.Mui-disabled': {
          //     background: grey[100],
          // }
        },
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
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
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
    // subtitle2lg: {
    //   fontWeight: 500,
    //   fontSize: "1rem",
    //   lineHeight: 1.75,
    //   fontFamily: "Maven Pro, sans-serif",
    //   letterSpacing: 0,
    // },
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

    button: {
      textTransform: 'none',
    },
  },
});

export const DarkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#002147',
      light: '#0096FF',
      dark: '#1F305E',
    },
    secondary: {
      main: '#FFD700',
      dark: '#FF6400',
      contrastText: '#ffffff',
    },
    // primaryLight: {
    //   main: "#6699CC",
    //   dark: "#0C36A0",
    //   contrastText: "#ffffff",
    // },
    background: {
      default: '#ccdbee',
      paper: '#FFFFFF',
    },
    // blue: {
    //   main: "#002147",
    // },
    // black: {
    //   main: "#1B1B1B",
    // },
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
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: 'white',
          height: '2.7rem',
          borderRadius: '0.5rem',
          // '&.Mui-disabled': {
          //     background: grey[100],
          // }
        },
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          padding: '0rem!important',
          // '&.Mui-disabled': {
          //     background: grey[100],
          // }
        },
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
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
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
    // subtitle2lg: {
    //   fontWeight: 500,
    //   fontSize: "1rem",
    //   lineHeight: 1.75,
    //   fontFamily: "Maven Pro, sans-serif",
    //   letterSpacing: 0,
    // },
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

    button: {
      textTransform: 'none',
    },
  },
});

