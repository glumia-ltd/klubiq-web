export const styles = {
	contentContainer: {
		// height: "100vh",
		padding: '24px 32px',
	},
	headerDiv: {
		paddingTop: '32px',
		paddingLeft: '62.06px',
	},
	activeButton: {
		// backgroundColor: 'translucent',
		color: '#002147',
		padding: '16px',
		borderRadius: '10px',
		width: '240px',
		height: '38px',
		textTransform: 'none',
		fontWeight: 'bold',
		marginRight: '25px',
		'&.Mui-selected': {
			backgroundColor: 'primary.main',
			color: 'white',
		},
		// '&:hover': {
		// 	// backgroundColor: 'primary.main',
		// 	color: 'primary.main',
		// },
	},
	headerText: {
		fontWeight: '500',
		fontSize: '16px',
		lineHeight: '20px',
		// mb: "10px"
	},

	subHeaderText: {
		fontWeight: '400',
		fontSize: '14px',
		lineHeight: '20px',
		// color:"primary"
	},
};
