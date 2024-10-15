import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface MFAPromptProps {
	open: boolean;
	onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
	onMFASetupClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const MFAPrompt = ({ open, onClose, onMFASetupClick }: MFAPromptProps) => {
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
				<Typography variant='h4'>ENABLE TWO-FACTOR AUTHENTICATION</Typography>
				<Typography variant='body2'>
					You haven't set up Two-Factor Authentication (2FA) yet. To better
					secure your account and protect your data, please set it up.
				</Typography>
				<Button variant='contained' onClick={onMFASetupClick}>
					Enable
				</Button>
			</Stack>
		</Dialog>
	);
};

export default MFAPrompt;
