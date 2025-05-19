export const AppContainerStyle = {
	box: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '100vh',
		minWidth: '100vw',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		padding: '20px',
		overflowY: 'auto',
		justifyContent: 'space-between',
	},
};
export const SharedStyles = {
	actionButton: {
		backgroundColor: 'primary.main',
		color: 'white',
	},
	iconStyle: {
		width: '24px',
		height: '24px',
		cursor: 'pointer',
	},
    breadCrumbStyle: {
		paddingLeft: '18px',
		'& .css-4pdmu4-MuiBreadcrumbs-ol': {
			gap: '10px',
		},
	},
	arrowIconStyle: {
		height: '15px',
		width: '15px',
	},
};

export default SharedStyles;
