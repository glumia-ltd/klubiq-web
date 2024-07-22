import {
	Dialog,
	DialogContent,
	Box,
	Typography,
	Divider,
	Button,
} from '@mui/material';
import successImage from '../../assets/images/check.svg';

interface AddTenantModalProps {
	open: boolean;
	onClose: () => void;
}
const AddTenantModal = ({ open, onClose }: AddTenantModalProps) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth='xs'
			fullWidth
			sx={{
				backgroundImage: 'none',
				alignItems: 'center',
				textAlign: 'center',
				padding: '32px 0px 16px 0px',
			}}
		>
			<DialogContent>
				<Box sx={{ mb: 2, alignItems: 'center' }}>
					<img
						src={successImage}
						alt='success'
						style={{
							width: '64px',
							height: '64px',
							marginBottom: '23px',
						}}
					/>

					<Typography
						variant='subtitle1'
						sx={{ fontWeight: '600', fontSize: '25px', gap: '32px' }}
					>
						You’ve successfully added your tenant!{' '}
					</Typography>
				</Box>
				<Divider />
				<Box sx={{ textAlign: 'center' }}>
					<Button variant='text' size='small'>
						Continue
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default AddTenantModal;
