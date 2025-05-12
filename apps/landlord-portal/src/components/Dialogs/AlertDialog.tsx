import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styles } from './style';

export type DialogProps = {
	id: string;
	open: boolean;
	title: string;
	message: string;
	cancelButtonText: string;
	confirmButtonText: string;
	onCancelClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
	onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
	onConfirmClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const AlertDialog = ({
	open,
	title,
	message,
	onClose,
	onConfirmClick,
	onCancelClick,
	cancelButtonText,
	confirmButtonText,
}: DialogProps) => {
	return (
		<Dialog open={open}>
			<IconButton
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
				}}
				onClick={onClose}
			>
				<CloseIcon />
			</IconButton>
			<Stack
				direction={'column'}
				spacing={3}
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
					textAlign: 'center',
					p: 4,
				}}
			>
				{/* Add Icon here later */}
				<Typography variant='h4' sx={styles.twoFaStyles.title}>
					{title}
				</Typography>
				<Typography variant='body2'>
					{message}
				</Typography>
				<Stack direction={'row'} spacing={1}>
					
					<Button variant='klubiqMainButton' onClick={onConfirmClick }>
					{confirmButtonText} 
					</Button>
					<Button variant='klubiqOutlinedButton' onClick={onCancelClick}>
					{cancelButtonText}
					</Button>
				</Stack>
			</Stack>
		</Dialog>
	);
};

export default AlertDialog;
