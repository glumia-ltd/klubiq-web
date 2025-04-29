export const styles = {
	mainCardContainerStyle: {
		marginTop: '24px',
		borderRadius: '8px',
		padding: '16px',
		// color:'primary.main'
	},
	mainCardStyle: {
		display: 'flex',
		gap: '24px',
		padding: '16px',
	},
	skelPic: {
		minWidth: '182px',
		minHeight: '182px',
	},
	mainPictureStyle: {
		maxHeight: '182px',
		maxWidth: '182px',
		borderRadius: '8px',
	},
	propertyDetailsStyle: {
		flexGrow: 2,
	},

	propertyHeaderStyle: {
		display: 'flex',
		justifyContent: 'space-between',
	},

	propertyHeaderText: {
		// color:'primary.main',
		lineHeight: '0.7',
	},
	reducedTextStyle: {
		marginTop: '8px',
		display: 'flex',
		alignItems: 'center',
		fontSize: '12px',
	},

	propertyIdStyle: {
		display: 'flex',
	},

	additionalInfo: {
		display: 'flex',
		gap: '16px',
		alignItems: 'center',
	},

	additionalInfoContainer: {
		display: 'flex',
		gap: '10rem',
		marginTop: '32px',
	},
	additionalInfoText: {
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
	},
	additionalInfoPicture: {
		height: '28px',
		width: '28px',
	},

	additionalChipStyle: {
		marginTop: '16px',
	},

	additionalChipText: {
		// backgroundColor: 'background.paper',
		// color: '#0C36A0',
		fontWeight: 600,
	},
	stackedImagesContainer: {
		cursor: 'pointer',
		position: 'relative',
		height: '9rem',
		width: '9rem',
	},
	cardContents: {
		mainImage: {
			width: '20%',
			display: {
				xs: 'none',
				sm: 'block',
			},
		},
		propertyDetail: {
			width: '80%',
		},
	},
	stacks: {
		main: {
			width: '100%',
			alignItems: 'center',
		},
		secondary: {
			width: '100%',
			justifyContent: 'space-between',
			alignItems: {
				xs: 'flex-start',
				sm: 'center',
			},
		},
		propertyDetail: {
			alignItems: 'start',

			dataStack: {
				justifyContent: 'space-between',
				width: '100%',
			},
		},
	},
};
