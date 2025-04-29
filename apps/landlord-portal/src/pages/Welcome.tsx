import { Switch, Typography } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../context/ThemeContext/themeTypes';

export const Welcome = () => {
	const { mode, switchMode } = useContext(ThemeContext);
	const switchValue =
		mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;
	return (
		<div>
			<Switch onChange={() => switchMode(switchValue)} />
			<Typography variant='h1'>Welcome to Klubiq!</Typography>
		</div>
	);
};
