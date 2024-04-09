import {
  PropsWithChildren,
  FunctionComponent,
  createContext,
  useEffect,
  useState,
} from 'react';
import { DarkTheme, LightTheme } from './theme';
import { Paper, Theme, ThemeProvider, useMediaQuery } from '@mui/material';
import { ThemeContextType, ThemeMode } from './themeTypes';

const initialMode = {
  mode: ThemeMode.LIGHT,
  switchMode: () => null,
};

export const ThemeContext = createContext<ThemeContextType>(initialMode);

const { Provider } = ThemeContext;

export const ThemeContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  //check if the user selected a mode preference. If there is no mode, this returns NULL

  const storedPreference = localStorage.getItem('mode');

  //If the mode exists in localStorage, convert it to a boolean by checking if it is dark.
  //otherwise return the result of fetching a non-existent value from local storage - NULL.

  const STORED_USER_PREFERENCE = storedPreference
    ? storedPreference === 'dark'
    : storedPreference;

  // STORED_USER_PREFERENCE = true if LS is dark, false if LS is light or NULL if nothing in LS

  //Get the system preference, this returns true if dark

  const USER_SYSTEM_PREFERENCE: boolean = useMediaQuery(
    '(prefers-color-scheme: dark)'
  );

  //USER_SYSTEM_PREFERENCE = true if dark, false otherwise

  // STORED_USER_PREFERENCE ? STORED_USER_PREFERENCE : USER_SYSTEM_PREFERENCE

  //Give precedence to the STORED_USER_PREFERENCE from the local storage.
  //If it is null, then select USER_SYSTEM_PREFERENCE through nullish coalescing

  const CURRENT_PREFERENCE = STORED_USER_PREFERENCE ?? USER_SYSTEM_PREFERENCE;

  //If either of the STORED_USER_PREFERENCE or USER_SYSTEM_PREFERENCE is true,
  // then we are sure the user wants a dark theme

  const defaultTheme: Theme = CURRENT_PREFERENCE ? DarkTheme : LightTheme;

  const defaultMode: ThemeMode = CURRENT_PREFERENCE
    ? ThemeMode.DARK
    : ThemeMode.LIGHT;

  const [muiTheme, setMuiTheme] = useState<Theme>(defaultTheme);
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const switchMode = (mode: ThemeMode) => {
    localStorage.setItem('mode', mode);

    setMode(mode);
  };

  useEffect(() => {
    if (mode === ThemeMode.LIGHT) {
      setMuiTheme(LightTheme);
    } else if (mode === ThemeMode.DARK) {
      setMuiTheme(DarkTheme);
    }
  }, [mode]);

  return (
    <Provider value={{ mode, switchMode }}>
      <ThemeProvider theme={muiTheme}>
        <Paper elevation={0} sx={{ height: '100vh' }} square>
          {children}
        </Paper>
      </ThemeProvider>
    </Provider>
  );
};
