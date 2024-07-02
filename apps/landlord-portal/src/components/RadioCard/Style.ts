const styles = {
	card: {
		minHeight: '26px',
		padding: { xs: '15px', sm: '20px', md: '32px', lg: '32px' },
		borderRadius: '8px',
		maxWidth: '1150px',
		alignItems: 'center',
		JustifyContent: 'center',
		minWidth: '360px',
	},

	typo: {
		fontSize: { xs: '13px', sm: '16px', md: '16px', lg: '20px' },
		lineHeight: { xs: '20px', sm: '20px', md: '24px', lg: '24px' },
		textTransform: 'uppercase',
		marginBottom: '15px',
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
		border: '1px solid #1B1B1B',
		padding: { xs: '10px', sm: '10px', md: '14px', lg: '16px' },
		// minWidth:"330px",

		maxHeight: '100px',
		// minWidth:"0",
		// maxWidth: { xs: '80%', sm: '80%', md: '80%', lg: '95%' },

		// minWidth: { xs: '320px', sm: '500px', md: '650px', lg: '1084px' },
		marginBottom: '15px',
		borderRadius: '8px',
		// textAlign:"left",
		//    width:"1084px"
		width: '100%',
		minWidth: { xs: '100%', sm: '642px', md: '100%', lg: '1084px' },
	},
	subText: {
		fontSize: { xs: '13px', sm: '16px', md: '14px', lg: '14px' },
		lineHeight: { xs: '20px', sm: '20px', md: '20px', lg: '20px' },
		marginLeft: '10px',
	},
};
export default styles;
