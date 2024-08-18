import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { closeSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { useDispatch } from 'react-redux';

type Props = {
	message: string;
	autoHideDuration: number;
	anchorOrigin: {
		vertical: 'top' | 'bottom';
		horizontal: 'center' | 'left' | 'right';
	};
	severity: 'success' | 'info' | 'warning' | 'error';
	open: boolean | undefined;
};

function ControlledSnackbar({
	message,
	autoHideDuration,
	anchorOrigin,
	severity,
	open,
}: Props): JSX.Element | null {
	const dispatch = useDispatch();

	if (!message) {
		return null;
	}

	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={() => dispatch(closeSnackbar())}
			anchorOrigin={anchorOrigin}
			sx={{
				width: '100%',
				fontFamily: 'Maven Pro, sans-serif',
				fontSize: '16px',
			}}
		>
			<Alert
				onClose={() => dispatch(closeSnackbar())}
				severity={severity}
				variant='filled'
				sx={{
					color: 'primary.contrastText',
				}}
			>
				{message}
			</Alert>
		</Snackbar>
	);
}
export default ControlledSnackbar;
