const style = {
	headerText: {
		fontSize: { xs: '13px', sm: '14px', md: '14px', lg: '16px' },
		lineHeight: { xs: '20px', sm: '24px', md: '24px', lg: '24px' },
		fontWeight: '600',
	},
	subText: {
		fontSize: { xs: '12px', sm: '12px', md: '14px', lg: '14px' },
		lineHeight: { xs: '24px', sm: '14px', md: '20px', lg: '20px' },
		fontWeight: '400',
	},
	contentdiv: {
		width: '100%',
		// padding: { xs: '10px', sm: '16px', md: '16px', lg: '16px' },
		alignItem: 'center',
		padding: '16px 24px 16px 24px',
	},
	content: {
		textAlign: 'left',
		alignItems: 'center',
		display: 'flex',
		padding: '16px 24px, 16px 24px',
	},
	imageStyle: {
		width: { xs: '25px', sm: '36px', md: '50px', lg: '60px' },
		height: { xs: '20px', sm: '36px', md: '50px', lg: '60px' },
		marginRight: '15px',
	},

	button: {
		background: '#002147',
		color: '#ffffff',
		width: '144px',
		height: '32px',
		padding: '6px 8px, 6px 8px',
		borderRadius: '8px',
		textAlign: 'center',

		'&:hover': {
			background: '#002147',
		},
	},
	lastBox: {
		display: 'flex',
		justifyContent: 'flex-end',
		textAlign: 'center',
		alignItems: 'center',
	},
};

export default style;
