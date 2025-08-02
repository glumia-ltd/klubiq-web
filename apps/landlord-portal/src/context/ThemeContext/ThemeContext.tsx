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
	const [muiTheme, setMuiTheme] = useState<Theme>(LightTheme);
	const [mode, setMode] = useState<ThemeMode>(ThemeMode.LIGHT);
	const [isInitialized, setIsInitialized] = useState(false);

	// Get system preference
	const USER_SYSTEM_PREFERENCE: boolean = useMediaQuery(
		'(prefers-color-scheme: dark)',
	);

	// Initialize theme on mount only
	useEffect(() => {
		if (isInitialized) {
			return;
		}

		const storedPreference = localStorage.getItem('mode');
		const STORED_USER_PREFERENCE = storedPreference
			? storedPreference === 'dark'
			: storedPreference;

		const CURRENT_PREFERENCE = STORED_USER_PREFERENCE ?? USER_SYSTEM_PREFERENCE;
		const defaultMode: ThemeMode = CURRENT_PREFERENCE
			? ThemeMode.DARK
			: ThemeMode.LIGHT;

		setMode(defaultMode);
		setMuiTheme(CURRENT_PREFERENCE ? DarkTheme : LightTheme);
		setBodyBackgroundColor(defaultMode);
		setIsInitialized(true);
	}, [USER_SYSTEM_PREFERENCE, isInitialized]);

	const switchMode = (newMode: ThemeMode) => {
		localStorage.setItem('mode', newMode);
		setMode(newMode);
		setBodyBackgroundColor(newMode);
	};

	const setBodyBackgroundColor = (themeMode: ThemeMode) => {
		const { body } = document;
		if (themeMode === ThemeMode.DARK) {
			body.classList.add('dark');
			body.classList.remove('light');
		} else {
			body.classList.remove('dark');
			body.classList.add('light');
		}
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
				<Paper elevation={0} square>
					{children}
				</Paper>
			</ThemeProvider>
		</Provider>
	);
};
