import AddIcon from '@mui/icons-material/Add';

import { Box, Typography, useTheme } from '@mui/material';

const AddPaymentMethodCard = ({ onClick }: { onClick?: () => void }) => {
	const theme = useTheme();
	return (
		<Box
			onClick={onClick}
			sx={{
				border: `1.5px dashed ${theme.palette.divider}`,
				borderRadius: 2,
				mt: 2,
				p: { xs: 3, sm: 3.5 },
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				color: theme.palette.text.secondary,
				transition: 'background 0.2s',
				minHeight: 80,
				outline: 'none',
				'&:hover, &:focus': {
					background: theme.palette.action.hover,
				},
				borderStyle: 'dashed',
				borderWidth: '1.5px',
				borderColor: theme.palette.divider,
			}}
			tabIndex={0}
			role='button'
			aria-label='Add Payment Method'
		>
			<AddIcon sx={{ fontSize: 32, mb: 0.5 }} />
			<Typography variant='body1' fontWeight={500} sx={{ mt: 1 }}>
				Add Payment Method
			</Typography>
		</Box>
	);
};

export default AddPaymentMethodCard;
