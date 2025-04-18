export const styles = {
	containerStyle: {
		overflow: 'auto',
		paddingTop: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
		paddingBottom: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
	},
	cardStyle: {
		height: { xs: '185px', sm: '185px', md: '210px' },
		paddingX: { xs: '16px', sm: '16px', md: '16px', lg: '16px', xl: '24px' },
		paddingY: { xs: '24px', sm: '24px', md: '32px', lg: '32px', xl: '32px' },
		borderRadius: '20px',
		alignItems: 'flex-start',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	cardStyleTwo: {
		height: { xs: '185px', sm: '185px', md: '210px' },
		//padding: { xs: '24px', sm: '25px', md: '15px', lg: '24px' },
		paddingX: { xs: '16px', sm: '16px', md: '16px', lg: '16px', xl: '24px' },
		paddingY: { xs: '24px', sm: '24px', md: '32px', lg: '32px', xl: '32px' },
		borderRadius: '20px',
		alignItems: 'flex-start',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	cardStyleThree: {
		height: { xs: '185px', sm: '185px', md: '210px' },
		borderRadius: '20px',
		//padding: { xs: '1rem', sm: '10px', md: '20px', lg: '24px' },
		paddingX: { xs: '16px', sm: '16px', md: '16px', lg: '16px', xl: '24px' },
		paddingY: { xs: '24px', sm: '24px', md: '32px', lg: '32px', xl: '32px' },
		alignItems: 'flex-start',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	cardStyleFour: {
		height: { xs: '185px', sm: '185px', md: '210px' },
		textAlign: 'left',
		//padding: { xs: '24px', sm: '10px', md: '20px', lg: '24px' },
		paddingX: { xs: '16px', sm: '16px', md: '16px', lg: '16px', xl: '24px' },
		paddingY: { xs: '16px', sm: '16px', md: '24px', lg: '24px', xl: '24px' },
		borderRadius: '20px',
		alignItems: 'flex-start',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	cardStyleFive: {
		width: '100%',
		//padding: { xs: '2.5rem', sm: '10px', md: '20px', lg: '24px' },
		paddingX: { xs: '16px', sm: '16px', md: '16px', lg: '16px', xl: '24px' },
		paddingY: { xs: '24px', sm: '24px', md: '32px', lg: '32px', xl: '32px' },
		borderRadius: '20px',
		overflow: 'auto',
		height: { xs: '400px', sm: '100%' },
	},
	selfFlex: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	boxStyle: {
		//display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
	},

	typoStyle: {
		fontSize: '14px',
		//lineHeight: '44px',
		fontWeight: 500,
		//mb: { sm: '0.5rem', md: '0.5rem', lg: '1rem' },
		textAlign: 'left',
	},
	leaseMetricsTextStyle: {
		fontSize: '12px',
		fontWeight: 500,
		textAlign: 'left',
	},
	guageBoxStyle: {
		width: '100%',
	},
	valueTextStyle: {
		fontSize: {
			xs: '24px',
			sm: '24px',
			md: '24px',
			lg: '24px',
			xl: '40px',
		},
		//fontWeight: 800,
		//lineHeight: '44px',
	},
	skeletonCon: {
		height: '100vh',
	},
	revenueTextStyle: {
		fontSize: {
			xs: '24px',
			sm: '24px',
			md: '24px',
			lg: '24px',
			xl: '40px',
		},
		fontWeight: 800,
		//lineHeight: '44px',
	},

	changeArrowBoxStyle: {
		display: 'flex',
		textAlign: 'left',
		//marginTop: { xs: '35px', md: '28px', lg: '35px' },
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	icons: {
		marginRight: '15px',
	},
	changeTypographyStyle: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 500,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '20px',
		padding: '10px',
		height: '24px',
		display: 'flex',
		mr: { xs: '15px', md: '5px', lg: '15px' },
	},
	calendarTodayStyle: {
		color: '#FF0000',
		gap: '10px',
		width: '24px',
		height: ' 24px',
		padding: '4px',
	},

	overdueTextStyle: {
		fontSize: {
			xs: '14px',
			sm: '14px',
			md: '16px',
			lg: '24px',
			xl: '40px',
		},

		fontWeight: 800,
		//lineHeight: '44px',
		alignItems: 'center',
	},

	leaseMetricsValues: {
		fontSize: {
			xs: '20px',
			sm: '24px',
			md: '24px',
			lg: '24px',
			xl: '32px',
		},

		fontWeight: 800,
		//lineHeight: '44px',
		alignItems: 'center',
	},

	overdueTypo: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 400,
		//mt: '2rem',
	},
	occupancyBoxStyle: {
		display: 'flex',
		textAlign: 'center',
		alignItems: 'center',
		marginBottom: '1rem',
	},

	occupancyTextStyle: {
		fontSize: {
			xs: '24px',
			sm: '24px',
			md: '24px',
			lg: '24px',
			xl: '40px',
		},
		fontWeight: 800,
		//lineHeight: '44px',
		mr: '30px',
	},

	totalExpensesStyle: {
		// display: 'flex',
		justifyContent: 'space-between',
		textAlign: 'left',
		marginTop: '12px',
		width: '100%',
		// flexDirection: 'row',
	},

	totalRevenueStyle: {
		borderRadius: '20px',
		padding: {
			xs: '24px',
			sm: '20px',
			md: '24px',
			lg: '24px',
			xl: '24px',
		},
		marginTop: '1rem',
		transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
	},

	downloadButtonStyle: {
		padding: '8px, 12px, 8px, 12px',
		width: '45px',
		height: '35px',
		borderRadius: '8px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'background.paper',
		marginLeft: { xs: '0', sm: '13rem', md: '2rem', lg: '2rem', xl: '2rem' },
		'&:hover': {
			backgroundColor: 'background.paper',
		},
	},
	datepickerStackStyle: {
		justifyContent: 'center',
		alignItems: 'center',
	},
};
