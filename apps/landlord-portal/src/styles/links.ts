import { styled } from '@mui/material/styles';
import { Link, LinkProps } from '@mui/material';

export const BoldTextLink = styled(Link)<LinkProps>(() => ({
	color: '#002147',
	fontWeight: '700',
	textDecoration: 'none',
}));
