export const styles = {
	container: {
		padding: '2rem 6rem',
		// paddingTop: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
		// paddingBottom: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
		// paddingLeft: { xs: '1.5rem', sm: '0.5rem', md: '0rem', lg: '0rem' },
		// paddingRight: { xs: '1.5rem', sm: '0.5rem', md: '0rem', lg: '0rem' },

		overflow: 'auto',
	},
	buttons: {
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: '16px',
	},
	addPropertyButton: {
		display: 'flex',
		padding: '8px 16px',
		borderRadius: '10px',
		gap: '8px',
	},
	inputStyle: {
		p: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		border: '1px solid #262626',
		borderRadius: '10px',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		marginTop: '32px',
	},

	filterContainer: {
		mt: '10px',
	},

	filterResultText: {
		color: '#1B1B1B',
		fontSize: '18px',
		m: '20px 0px',
	},
	filterResultNumber: {
		fontSize: '32px',
		fontWeight: 700,
		lineHeight: '38px',
	},
};
