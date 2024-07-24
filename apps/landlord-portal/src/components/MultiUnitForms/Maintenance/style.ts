const style = {
	card: {
		width: '100%',
		maxWidth: '890px',
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
		marginRight: '10px',

		'&:hover': {
			color: 'white',
			background: '#002147',
			cursor: 'pointer',
		},
	},
	box: {
		border: '1px solid #D3D3D3 ',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		display: 'flex',
		height: '278px',
		borderRadius: '10px',
	},
	buttonGrid: {
		justifyContent: 'flex-end',
		textAlign: 'center',
		display: 'flex',
	},
	uploadBox: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	icon: {
		width: '40px',
		height: '40px',
	},
	typo: {
		fontSize: { xs: '13px', sm: '16px', md: '16px', lg: '20px' },
		lineHeight: { xs: '20px', sm: '20px', md: '24px', lg: '24px' },
	},
	content: {
		padding: '24px',
	},
	infobox: {
		display: 'flex',
		alignItems: 'center',
	},
	infoimg: {
		width: '32px',
		height: '32px',
		marginRight: '5px',
	},
	infotypo: {
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '16px' },
		lineHeight: { xs: '18px', sm: '18px', md: '18px', lg: '18px' },
		fontWeight: 400,
	},
};
export default style;
