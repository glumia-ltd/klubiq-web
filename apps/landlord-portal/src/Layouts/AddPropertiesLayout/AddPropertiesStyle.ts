const styles = {
	containerStyle: {
		overflow: 'auto',
		paddingTop: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
		paddingBottom: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
		fontSize: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
	},
	addPropertiesContainer: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	addPropertiesContent: {
		display: 'flex',
		cursor: 'pointer',
		alignItems: 'center',
		gap: { xs: '0.1rem', sm: '0.1rem', md: '0.9rem', lg: '1.25rem' },
	},

	addPropertiesImage: {
		height: '25px',
		width: '25px',
	},

	addPropertiesText: {
		fontSize: { xs: '0.9rem', sm: '1.25rem', md: '1.25rem', lg: '1.25rem' },
	},

	button: {
		padding: '6px 8px',
		borderRadius: '10px',
		background: '#ffffff',
		fontSize: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
		minWidth: { xs: '4rem', sm: '9rem', md: '9rem', lg: '9rem' },
		minHeight: '2rem',
	},

	stepperContainer: {
		width: '100%',
		margin: '51px auto',
	},

	buttonContainer: {
		display: 'flex',
		gap: '16px',
		justifyContent: 'flex-end',
		marginTop: '40px',
	},

	directionButton: {
		display: 'flex',
		width: { xs: '7rem', sm: '9rem', md: '11rem', lg: '11.25rem' },
		height: { xs: '2rem', sm: '2rem', md: '2.5rem', lg: '2.5rem' },
		padding: '0.5rem 0.9rem',
		borderRadius: '0.6rem',
		gap: '0.6rem',
	},
};

export default styles;
