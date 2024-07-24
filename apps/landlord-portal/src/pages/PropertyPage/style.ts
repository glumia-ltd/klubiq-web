import {
	borderRadius,
	display,
	fontWeight,
	lineHeight,
	maxHeight,
	minHeight,
} from '@mui/system';

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

	tenantTableContainer: {
		maxHeight: '312px',
		overflow: 'scroll',
	},

	tableCell: {
		backgroundColor: '#fff',
		padding: '5px',
		color: 'primary.main',
		fontSize: '24px',
		fontWeight: '700',
	},
	// tableButton: {
	// 	background: '#fff',
	// 	width: '144px',
	// 	height: '32px',
	// 	padding: '6px 8px, 6px 8px',
	// 	borderRadius: '8px',
	// 	textAlign: 'center',
	// },

	tableHeaderCellStyle: {
		background: 'transparent',
		color: '#1B1B1BB2',
		borderTop: '1px solid #B8D9FF ',
		borderBottom: '1px solid #B8D9FF ',
	},
	tenantInfoStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: '20px',
	},
	tableBodyStyle: {
		background: '#fff',
		border: 'none',
		fontSize: '14px',
		color: 'primary.main',
	},

	addMaintenance: {
		display: 'flex',
		cursor: 'pointer',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'primary.main',
		gap: '13px',
	},
	addMaintenanceText: {
		textDecoration: 'underline',
	},

	emptyDataInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	emptyDataText: {
		display: 'flex',
		padding: '16px',
		justifyContent: 'center',
		borderBottom: '1px solid #B8D9FF',
		width: '100%',
		fontSize: '20px',
	},

	createMaintenceButton: {
		display: 'flex',
		gap: '8px',
		borderRadius: '10px',
		width: '40%',
		fontSize: '25px',
		backgroundColor: 'primary.main',
		padding: '8px 16px',
		marginTop: '30px',
		color: '#fff',

		'&:hover': {
			backgroundColor: 'primary.main',
		},
	},
};
