const style = {
	card: {
		width: '100%',
		maxWidth: '448px',
	},
	content: {
		padding: '24px',
	},
	infobox: {
		alignItems: 'center',
		gap: '16px',
		marginBottom: '15px',
	},
	skeleton: {
		marginTop: '25px',
	},
	infotypo: {
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '14px' },
		lineHeight: { xs: '18px', sm: '18px', md: '18px', lg: '20px' },
		fontWeight: 400,
	},
	typo: {
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '16px' },
		lineHeight: { xs: '18px', sm: '18px', md: '20px', lg: '24px' },
		fontWeight: 600,
	},
	radioLabel: {
		'& .MuiFormControlLabel-label': {
			fontSize: { xs: '14px', sm: '12px', md: '14px', lg: '14px' },
		},
		lineHeight: { xs: '20px', sm: '18px', md: '20px', lg: '20px' },
		textTransform: 'capitalize',
		fontWeight: '400',
		fontFamily: 'Maven Pro, sans-serif',
	},
	formControl: {
		width: '100%',
	},
	boxTwo: {
		display: 'flex',
		// justifyContent:"space-between"
	},
	box: {
		display: 'flex',
		justifyContent: 'center',
	},
	boxThree: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	blueButton: {
		border: '1px solid #002147',
		color: 'white',
		background: '#002147',
		height: '40px',
		width: '180px',
		padding: '8px 14px 8px 14px',
		gap: '10px',
		'&:hover': {
			color: '#002147',
			background: '#ffffff',
			cursor: 'pointer',
		},
	},
	plainButton: {
		border: '1px solid #002147',
		gap: '10px',
		background: '#ffffff',
		height: '40px',
		width: '180px',
		padding: '8px 14px 8px 14px',

		'&:hover': {
			color: 'white',
			background: '#002147',
			cursor: 'pointer',
		},
	},
};
export default style;
