export const styles = {
	overviewStyle: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '32px',
		padding: '0px 24px',
	},
	overviewHeader: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
	},
	editImageStyle: {
		cursor: 'pointer',
	},
	overviewTextContainer: {
		display: 'flex',
		flexDirection: 'column',
	},

	overviewContent: {
		marginTop: '16px',
		lineHeight: '24px',
		overflow: 'hidden',
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		textOverflow: 'clip',
	},

	readMoreStyle: {
		lineHeight: '24px',
		cursor: 'pointer',
	},

	textFieldStyle: {
		marginTop: '16px',
		'& .MuiOutlinedInput-root': {
			padding: '12px',
			fontSize: '16px',
			overflow: 'hidden',
			textOverflow: 'scroll',
			whiteSpace: 'nowrap',
			height: 'max-content',
			maxWidth: '90%',
		},
	},
	saveTextButton: {
		marginTop: '16px',
		color: 'primary.main',
		height: '40px',
		padding: '8px 12px',
		borderRadius: '10px',
		backgroundColor: '#ffffff',
		maxWidth: '144px',
		alignSelf: 'flex-end',
	},
};
