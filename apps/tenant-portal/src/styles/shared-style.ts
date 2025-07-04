export const AppContainerStyle = (isMobile: boolean) => ({
	box: {
		display: 'flex',
		flexDirection: isMobile ? 'column' : 'row',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'space-between',
		width: '100%',
		minHeight: 'calc(100vh - 100px)',
	},
});
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
