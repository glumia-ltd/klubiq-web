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
				p: 1,
				display: 'flex',
				flexDirection: iconPosition === 'top' ? 'column' : 'row',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				color: theme.palette.text.secondary,
				transition: 'background 0.2s',
				outline: 'none',
				'&:hover, &:focus': {
					background: theme.palette.action.hover,
				},
				height: height || 50,
				borderStyle: 'dashed',
				borderWidth: '1.5px',
				borderColor: theme.palette.divider,
			}}
			tabIndex={0}
			role='button'
			aria-label={content}
		>
			<AddIcon />
			<Typography variant='body1' >
				{content}
			</Typography>
		</Box>
	);
};

export default AddPaymentMethodCard;
