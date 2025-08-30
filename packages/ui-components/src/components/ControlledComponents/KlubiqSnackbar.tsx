import Snackbar from '@mui/material/Snackbar';
import { Alert, useTheme, useMediaQuery } from '@mui/material';

type Props = {
	message: string;
	autoHideDuration: number;
	severity: 'success' | 'info' | 'warning' | 'error';
	open: boolean | undefined;
	handleClose: () => void;
};

function KlubiqSnackbar({
	message,
	autoHideDuration,
	severity,
	open,
	handleClose,
}: Props): JSX.Element | null {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	if (!message) {
		return <></>;
	}

	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
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
			<Alert onClose={handleClose} severity={severity} variant='filled'>
				{message}
			</Alert>
		</Snackbar>
	);
}
export default KlubiqSnackbar;
