import Snackbar from '@mui/material/Snackbar';
import { Alert, useTheme, useMediaQuery } from '@mui/material';
import { closeSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { useDispatch } from 'react-redux';

type Props = {
	message: string;
	autoHideDuration: number;
	severity: 'success' | 'info' | 'warning' | 'error';
	open: boolean | undefined;
};

function ControlledSnackbar({
	message,
	autoHideDuration,
	severity,
	open,
}: Props): JSX.Element | null {
	const dispatch = useDispatch();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	if (!message) {
		return null;
	}

	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={() => dispatch(closeSnackbar())}
			anchorOrigin={{
				vertical: 'top',
				horizontal: isMobile ? 'center' : 'right',
			}}
			sx={{
				width: '100%',
				maxWidth: isMobile ? '100%' : '600px',
				fontFamily: 'Maven Pro, sans-serif',
				fontSize: '16px',
			}}
		>
			<Alert
				onClose={() => dispatch(closeSnackbar())}
				severity={severity}
				variant='filled'
			>
				{message}
			</Alert>
		</Snackbar>
	);
}
export default ControlledSnackbar;
