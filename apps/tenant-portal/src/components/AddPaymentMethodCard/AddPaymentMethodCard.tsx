import AddIcon from '@mui/icons-material/Add';

import { Box, Typography, useTheme } from '@mui/material';

const AddPaymentMethodCard = ({
	content,
	onClick,
	height,
	iconPosition = 'top',
}: {
	content: string;
	onClick?: () => void;
	height?: number;
	iconPosition?: 'top' | 'left';
}) => {
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
				flexDirection: iconPosition === 'top' ? 'column' : 'row',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				color: theme.palette.text.secondary,
				transition: 'background 0.2s',
				minHeight: height || 80,
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
			aria-label={content}
		>
			<AddIcon sx={{ fontSize: 32, mb: 0.5 }} />
			<Typography variant='body1' fontWeight={500}>
				{content}
			</Typography>
		</Box>
	);
};

export default AddPaymentMethodCard;
