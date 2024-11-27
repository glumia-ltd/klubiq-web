const style = {
	bannerTypes: {
		success: {
			backgroundColor: 'success.light',
			color: 'primary.contrastText',
		},
		error: {
			backgroundColor: 'error.light',
			color: 'secondary.contrastText',
		},
		info: {
			backgroundColor: 'info.light',
			color: 'secondary.contrastText',
		},
	},
	banner: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '8px 16px',
		position: 'fixed',
		top: 0,
		zIndex: 1300,
		boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
	},
};
export default style;
