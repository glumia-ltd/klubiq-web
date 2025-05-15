import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styles } from './style';

interface MFAPromptProps {
	open: boolean;
	onOptOutClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
	onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
	onMFASetupClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const MFAPrompt = ({
	open,
	onClose,
	onMFASetupClick,
	onOptOutClick,
}: MFAPromptProps) => {
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
					ENABLE TWO-FACTOR AUTHENTICATION
				</Typography>
				<Typography variant='body2'>
					You haven't set up Two-Factor Authentication (2FA) yet. To better
					secure your account and protect your data, please set it up.
				</Typography>
				<Stack direction={'row'} spacing={1}>
					<Button variant='klubiqOutlinedButton' onClick={onOptOutClick}>
						Opt Out
					</Button>
					<Button variant='klubiqMainButton' onClick={onMFASetupClick}>
						Enable
					</Button>
				</Stack>
			</Stack>
		</Dialog>
	);
};

export default MFAPrompt;
