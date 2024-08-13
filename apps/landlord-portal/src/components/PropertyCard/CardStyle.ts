const CardContainer = {
	borderRadius: '10px',
	boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
	transition: 'transform 0.3s ease-in-out',
};

const CardStyle = {
	cardContainerColumn: {
		...CardContainer,
	},
	cardContainerRow: {
		width: '100%',
		...CardContainer,
	},
	columnCard: {
		height: '550px',
		//width: '100%',
		padding: { xs: '16px', sm: '24px', md: '24px', lg: '24px' },
		borderRadius: '10px',
		//maxWidth: { xs: '100%', sm: '362px', md: '360px', lg: '362px' },
		border: '0.5px',
		textAlign: 'left',
	},
	rowCard: {
		width: '100%',
		//maxWidth: { xs: '100%', sm: '650px', md: '100%', lg: '100%' },

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
		fontSize: { xs: '13px', sm: '14px', md: '16px', lg: '16px' },
		lineHeight: { xs: '15px', sm: '14px', md: '20px', lg: '20px' },
		fontWeight: '600px',
	},
	text: {
		fontSize: { xs: '16px', sm: '14px', md: '16px', lg: '16px' },
		lineHeight: { xs: '15px', sm: '14px', md: '20px', lg: '20px' },
		fontWeight: '600px',
	},
	columnImage: {
		// minWidth: { xs: '150px', sx: '300px', md: '100px', lg: '330px' },
		borderRadius: '3px',

		maxHeight: { xs: '110px', sx: '250px', md: '200px', lg: '200px' },
	},
	rowImage: {
		// maxWidth: { xs: "100%", sx: "400px", md: "400px", lg: "400px" },
		// maxHeight: { xs: "100%", sx: "610px", md: "150px", lg: "150px" },
		width: { xs: '100%', sm: '100%', md: '100%', lg: '152px' },
		height: { xs: '100%', sm: '100%', md: '100%', lg: '109px' },
		borderRadius: '3px',
	},
	iconSize: {
		// width: { xs: '100%', sm: '100%', md: '100%', lg: '152px' },
		width: '24px',
		height: '24px',
		marginLeft: '-4px',
	},
	iconDiv: {
		display: 'flex',
		textAlign: 'left',
		marginBottom: '8px',
		gap: '8px',
		textWrap: 'wrap',
		height: '35px',
	},
	contentdiv: {
		display: 'flex',
		textAlign: 'left',
		alignItems: 'center',
		marginBottom: '1rem',
		justifyContent: 'space-between',
	},
	content: {
		alignItems: 'right',
		padding: '0px',
		marginBottom: '12px',
	},
	buttonTwoDiv: {
		display: 'flex',
		justifyContent: 'flex-end',
		cursor: 'pointer',
		marginTop: '2rem',
	},
	buttonTwo: {
		borderBottom: '1px solid ',
		fontsize: '16px',
		fontWeight: '600px',
	},
	button: {
		borderRadius: '12px',
		width: '64px',
		height: '26px',
		padding: '8px',
		fontSize: '12px',
		fontWeight: '500px',
		gap: '10px',
	},
	lastBox: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
};

export default CardStyle;
