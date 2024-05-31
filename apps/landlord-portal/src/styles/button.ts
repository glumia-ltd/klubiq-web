import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

export const SubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	height: '3.1rem',
	width: '100%',
	fontSize: '1.125rem',
	fontWeight: 'bold',
	borderRadius: '0.5rem',
	padding: '0.5rem 1rem',
	textTransform: 'capitalize',
	'&:hover': {
		backgroundColor: theme.palette.secondary.light,
		cursor: 'pointer',
		color: theme.palette.primary.contrastText,
	},
}));

export const LoadingSubmitButton = styled(LoadingButton)<ButtonProps>(
	({ theme }) => ({
		color: theme.palette.primary.contrastText,
		height: '3.1rem',
		width: '100%',
		fontSize: '1.125rem',
		fontWeight: 'bold',
		borderRadius: '0.5rem',
		padding: '0.5rem 1rem',
		border: `0.063rem solid ${theme.palette.primary.main}`,
	}),
);
