export const styles = {
	overviewStyle: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '32px',
		padding: '0px 24px',
	},
	overviewHeader: {
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
		color: 'primary.main',
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
		//color: 'primary.main',
		height: '40px',
		padding: '8px 12px',
		borderRadius: '10px',
		maxWidth: '144px',
		alignSelf: 'flex-end',
	},
	saveTextButtonStack: {
		alignSelf: 'flex-end',
		gap: '8px',
		marginTop: '16px',
	},


	showHideTextStyle: {
		// background: '#fff',
		width: '144px',
		height: '32px',
		padding: '6px 8px, 6px 8px',
		borderRadius: '8px',
		textAlign: 'center',
		alignSelf: 'flex-end',
		marginTop: '16px',
	},
};
