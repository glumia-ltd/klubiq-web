import { fontWeight } from '@mui/system';

const styles = {
	card: {
		padding: { xs: '15px', sm: '20px', md: '32px', lg: '32px' },
		borderRadius: '8px',

		alignItems: 'center',
		JustifyContent: 'center',
		width: '100%',
	},

	typo: {
		fontSize: { xs: '13px', sm: '16px', md: '16px', lg: '20px' },
		lineHeight: { xs: '20px', sm: '20px', md: '24px', lg: '24px' },
		textTransform: 'uppercase',
		marginBottom: '15px',
		color: '#002147',
	},
	radioLabel: {
		'& .MuiFormControlLabel-label': {
			fontSize: { xs: '13px', sm: '16px', md: '16px', lg: '16px' },
		},
		lineHeight: { xs: '20px', sm: '18px', md: '20px', lg: '20px' },
		textTransform: 'capitalize` wz',

		fontWeight: '500',
		fontFamily: 'Maven Pro, sans-serif',
		'& .MuiRadio-root': {
			padding: '2px',
			'& svg': {
				fontSize: { xs: '13px', sm: '16px', md: '16px', lg: '20px' },
			},
		},
	},
	box: {
		border: '1px solid',
		padding: { xs: '10px', sm: '10px', md: '14px', lg: '16px' },
		marginBottom: '15px',
		borderRadius: '8px',

		width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
		minWidth: '100%',
	},
	subText: {
		fontSize: { xs: '13px', sm: '16px', md: '14px', lg: '14px' },
		lineHeight: { xs: '20px', sm: '20px', md: '20px', lg: '20px' },
		marginLeft: '10px',
		width: '100%',
	},
	formControl: {
		width: '100%',
	},
};
export default styles;
