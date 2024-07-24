const style = {
	card: {
		width: '100%',
		maxWidth: '814px',
	},
	content: {
		padding: '24px',
	},
	infobox: {
		alignItems: 'center',
		gap: '16px',
		marginBottom: '15px',
	},

	infotypo: {
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '18px' },
		lineHeight: { xs: '18px', sm: '18px', md: '18px', lg: '28px' },
		fontWeight: 700,
		color: 'rgba(27, 27, 27, 0.4)',
	},
	typo: {
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '16px' },
		lineHeight: { xs: '18px', sm: '18px', md: '20px', lg: '24px' },
		fontWeight: 700,
		color: 'rgba(27, 27, 27, 0.4)',
	},
	typo2: {
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '14px' },
		lineHeight: { xs: '18px', sm: '18px', md: '20px', lg: '20px' },
		fontWeight: 500,
		color: 'rgba(27, 27, 27, 0.4)',
	},
	typo3: {
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '14px' },
		lineHeight: { xs: '18px', sm: '18px', md: '20px', lg: '20px' },
		fontWeight: 400,
		color: 'rgba(27, 27, 27, 0.4)',
	},
	typo4: {
		fontSize: { xs: '13px', sm: '12px', md: '12px', lg: '12px' },
		lineHeight: { xs: '18px', sm: '18px', md: '18px', lg: '18px' },
		fontWeight: 400,
		color: 'rgba(27, 27, 27, 0.4)',
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
