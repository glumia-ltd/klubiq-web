import { borderRadius, display } from '@mui/system';

export const styles = {
	container: {
		padding: '25px 90px',
		color: 'primary.main',
	},
	breadCrumbStyle: {
		paddingLeft: '18px',
		'& .css-4pdmu4-MuiBreadcrumbs-ol': {
			gap: '10px',
		},
	},
	iconStyle: {
		color: '#6699CC',
		width: '20px',
		height: '20px',
	},
	arrowIconStyle: {
		height: '15px',
		width: '15px',
	},
	textStyle: {
		color: 'primary.main',
	},

	actionButtonContainerStyle: {
		marginTop: '3rem',
		display: 'flex',
		justifyContent: 'flex-end',
	},

	actionButtonStyle: {
		color: 'primary.main',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '40px',
		padding: '8px 12px',
		gap: '8px',
		borderRadius: '10px',
		backgroundColor: '#ffffff',
		minWidth: '160px',
	},

	chipStyle: {
		marginLeft: '18px',
		padding: '2px',
		backgroundColor: 'primary.light',
		color: 'primary.contrastText',
		fontSize: '12px',
		fontWeight: '',
	},

	firstCardContainer: {
		backgroundColor: '#fff',
		borderRadius: '8px',
	},

	unitInfoCardStyle: {
		marginTop: '32px',
	},

	addfieldStyle: {
		marginTop: '32px',
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
	},
};
