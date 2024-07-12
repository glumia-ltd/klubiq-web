import { maxHeight, minHeight } from '@mui/system';

export const styles = {
	buttonStyle: {
		display: 'flex',
		gap: '8px',
		padding: '8px',
		outline: '1px dashed #002147',
		// marginTop: '10px',
		borderRadius: '8px',
	},

	selectedButtonContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '8px',
	},

	selectedState: {
		display: 'flex',
		gap: '1px',
	},

	filterContainer: {
		display: 'flex',
		alignItems: 'center',
		minHeight: '45px',
		marginTop: '16px',
	},

	selectedButtonStyle: {
		background: '#002147',
		display: 'flex',
		borderRadius: '8px 0px 0px 8px',
		cursor: 'pointer',
		padding: '8px 8px',
	},

	selectedButtonDropDown: {
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '8px',

		padding: '8px',
		color: '#fff',
		borderRadius: '0px 8px 8px 0px',
		background: '#002147',
	},

	dropdownIcon: {
		display: 'flex',
		alignItems: 'flex-end',
		height: '20px',
		width: '20px',
		alignSelf: 'center',
		margin: 'auto auto',
	},

	text: {
		fontSize: '16px',
		color: '#002147',
		backgroundColor: '#fff',
		borderRadius: '10px',
		padding: '4px 4px',
	},

	labelWithIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	applyButtonStyle: {
		bgcolor: '#001F4B',
		color: '#fff',
		width: '70%',
		margin: '0 auto',
		borderRadius: '10px',
		padding: '8px 14px',
	},
	modalBackgroundStyle: {
		position: 'absolute',
		padding: 2,
		minWidth: 300,
		border: '1px solid #001F4B',
		borderRadius: 2,
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column',
	},
};
