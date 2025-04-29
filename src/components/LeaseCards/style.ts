export const styles = {
	container: {
		borderRadius: '8px',
		padding: '16px 32px 16px 32px',
		minWidth: '179px',
	},

	cardContainer: {
		borderRadius: '8px',
		padding: '8px',
		width: { xs: '100%', sm: '48%', md: '32%' },
		height: '80px',
	},
	chip: {
		padding: '5px',
		fontSize: '12px',
		fontWeight: '600',
	},

	check: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	detailsBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '142px',
	},
	addressDiv: {
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'center',
	},
	headerText: {
		fontWeight: '600',
		fontSize: '16px',
	},
	topIcon: {
		height: '10px',
		width: '10px',
		color: '#6699CC',
	},
	detailsText: {
		fontWeight: '700',
		fontSize: '12px',
	},
	nameText: {
		fontWeight: '500',
		fontSize: '16px',
	},
	typoText: {
		fontWeight: '700',
		fontSize: { xs: '8px', md: '16px', lg: '24px' },
	},
	amountText: {
		fontWeight: '400',
		fontSize: { xs: '8px', md: '16px' },
	},
	typo: {
		fontWeight: '700',
		fontSize: { xs: '16px', md: '20px' },
		marginBottom: '8px',
		lineHeight: '24px',
	},
	cardContent: {
		display: 'flex',
		alignItems: 'start',
		justifyContent: 'space-around',
		height: '100%',
	},
	paginationStyle: {
		mt: 2,
		'& .MuiPaginationItem-root': {
			borderRadius: 0,
			border: '1px solid #ddd',
			minWidth: '28px',
			height: '30px',
		},
	},
};
