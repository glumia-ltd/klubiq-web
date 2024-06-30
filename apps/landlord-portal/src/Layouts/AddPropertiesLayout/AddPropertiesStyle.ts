import { borderRadius } from '@mui/system';

const styles = {
	containerStyle: {
		overflow: 'auto',
		paddingTop: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
		paddingBottom: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
	},
	addPropertiesContainer: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	addPropertiesContent: {
		display: 'flex',
		cursor: 'pointer',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '1.5rem',
	},

	addPropertiesImage: {
		height: '25px',
		width: '25px',
	},

	addPropertiesText: {
		fontSize: '1.25rem',
	},
	button: {
		padding: '6px 8px',
		borderRadius: '10px',
		background: '#ffffff',
		fontSize: '14px',
		minWidth: '9rem',
		minHeight: '2rem',
	},

	stepperContainer: {
		width: '80%',
		margin: '51px auto',
	},

	buttonContainer: {
		display: 'flex',
		gap: '16px',
		justifyContent: 'flex-end',
	},

	directionButton: {
		display: 'flex',
		width: '11.25rem',
		height: '2.5rem',
		padding: '0.5rem 0.9rem',
		borderRadius: '0.6rem',
		gap: '0.6rem',
	},
};

export default styles;
