import { Theme, createTheme } from '@mui/material';

export const LightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    // background: {
    //   default: '#F3FCFF',
    //   paper: '#FFFFFF',
    // },
  },
});

export const DarkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    // background: {
    //   default: '#212527',
    //   paper: '#292C31',
    // },
  },
});
