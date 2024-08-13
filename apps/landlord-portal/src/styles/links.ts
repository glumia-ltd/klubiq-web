import { styled } from '@mui/material/styles';
import { Link, LinkProps } from '@mui/material';

export const BoldTextLink = styled(Link)<LinkProps>(({ theme }) => ({
	color: theme.palette.primary.main,
	fontWeight: '700',
	textDecoration: 'none',
	cursor: 'pointer',
	pointerEvents: 'auto',
	'&:hover': {
		color: theme.palette.secondary.dark,
	},
	'&:active': {
		color: theme.palette.secondary.dark,
	},
}));
