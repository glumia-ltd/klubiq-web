const CardStyle = {
	columnCard: {
		minHeight: { xs: '300px', sm: '350px', md: '400px', lg: '500px' },
		padding: { xs: '20px', sm: '16px', md: '16px', lg: '16px' },
		borderRadius: '10px',
		maxWidth: { xs: '400px', sm: '360px', md: '320px', lg: '362px' },
		border: '0.5px',
		textAlign: 'left',
	},
	rowCard: {
		width: '100%',
		maxWidth: { xs: '500px', sm: '650px', md: '100%', lg: '100%' },
		padding: { xs: '20px', sm: '32px', md: '32px', lg: '32px' },
		// maxHeight: { xs: "500px", sm: "250px", md: "250px", lg: "245px" },
		borderRadius: '10px',
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'left',
		alignItems: 'center',
	},
	headerText: {
		fontSize: { xs: '13px', sm: '14px', md: '14px', lg: '18px' },
		lineHeight: { xs: '20px', sm: '10px', md: '20px', lg: '20px' },
		marginBottom: '10px',
	},
	subText: {
		fontSize: { xs: '13px', sm: '14px', md: '16px', lg: '16px' },
		lineHeight: { xs: '24px', sm: '14px', md: '24px', lg: '24px' },
		fontWeight: '700',
	},
	bottomText: {
		fontSize: { xs: '13px', sm: '14px', md: '14px', lg: '14px' },
		lineHeight: { xs: '15px', sm: '14px', md: '20px', lg: '20px' },
		fontWeight: '600',
	},
	columnImage: {
		minWidth: { xs: '150px', sx: '300px', md: '200px', lg: '330px' },
		borderRadius: '3px',

		maxHeight: { xs: '110px', sx: '200px', md: '200px', lg: '200px' },
	},
	rowImage: {
		// maxWidth: { xs: "100%", sx: "400px", md: "400px", lg: "400px" },
		// maxHeight: { xs: "100%", sx: "610px", md: "150px", lg: "150px" },
		width: { xs: '100%', sm: '100%', md: '100%', lg: '152px' },
		height: { xs: '100%', sm: '100%', md: '100%', lg: '109px' },
		borderRadius: '3px',
	},
	iconSize: {
		width: '24px',
		height: '24px',
		marginLeft: '-4px',
	},
	iconDiv: {
		display: 'flex',
		textAlign: 'left',
		alignItems: 'center',
		marginBottom: '6px',
	},
	contentdiv: {
		display: 'flex',
		textAlign: 'left',
		alignItems: 'center',
		marginBottom: '6px',
		justifyContent: 'space-between',
	},
	content: {
		alignItems: 'right',
		padding: '0px',
		marginBottom: '6px',
	},
	buttonTwoDiv: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	buttonTwo: {
		borderBottom: '1px solid ',
		paddingBottom: '0px',
		marginBottom: '0px',
		fontsize: '16px',
		fontWeight: '500px',
	},
	button: {
		borderRadius: '12px',
		width: '64px',
		height: '26px',
		padding: '4px',
		fontSize: '12px',
		fontWeight: '500px',
		gap: '10px',
	},
};

export default CardStyle;
