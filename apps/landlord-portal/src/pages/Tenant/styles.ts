export const styles = {
	container: {
		overflow: 'auto',
		paddingTop: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
		paddingBottom: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: {
			xs: 'flex-start',
			md: 'flex-end',
		},
		alignItems: 'center',
	},
	infoimg: {
		width: '32px',
		height: '32px',
		marginRight: '5px',
	},
	card: {
		width: '100%',
		maxWidth: '814px',
	},
	detailsCard: {
		width: '100%',
		maxWidth: '1250px',
		padding: '8px 24px 8px 24px',
	},
	imageStyle: {
		borderRadius: '50%',
		width: '120px',
		height: '120px',
	},
	nameText: {
		fontWeight: '500',
		fontSize: '16px',
		marginTop: '15px',
	},
	nameText2: {
		fontWeight: '700',
		fontSize: '24px',
		marginTop: '15px',
	},
	subheadText: {
		fontWeight: '400',
		fontSize: '12px',
		marginTop: '10px',
	},
	cellText: {
		fontWeight: '400',
		fontSize: '20px',
	},
	typo2: {
		fontWeight: '400',
		fontSize: '16px',
	},
	typo3: {
		fontWeight: '400',
		fontSize: '12px',
		margin: '0',
		padding: '0px',
	},
	firstBox: {
		alignItems: 'center',
		// margin: "100px",
		// textAlign:"center"
	},
	iconStyleTwo: {
		color: 'primary.main',
		// fontSize:"16px",
		width: '16px',
		height: '16px',
	},
	boxText: {
		fontWeight: '500',
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '16px' },
	},
	cardTwoText: {
		fontWeight: '500',
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '14px' },
	},
	infotypo: {
		fontSize: { xs: '13px', sm: '12px', md: '14px', lg: '16px' },
		lineHeight: { xs: '18px', sm: '18px', md: '18px', lg: '18px' },
		fontWeight: 400,
	},
	infobox: {
		display: 'flex',
		alignItems: 'center',
		gap: 2,
		marginBottom: '15px',
	},
	tenBox: {
		display: 'flex',
		alignItems: 'center',
		gap: 1,
		marginBottom: '15px',
	},
	skeleton: {
		marginTop: '25px',
	},
	content: {
		padding: '24px',
	},
	blueButton: {
		border: '1px solid #002147',
		color: 'white',
		background: '#002147',
		height: '40px',
		width: '180px',
		padding: '8px 14px 8px 14px',
		gap: '10px',
		borderRadius: '10px',

		'&:hover': {
			color: '#002147',
			background: '#ffffff',
			cursor: 'pointer',
		},
	},
	boxTwo: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	box: {
		display: 'flex',
		justifyContent: 'center',
	},
	boxThree: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	plainButton: {
		border: '1px solid #002147',
		gap: '10px',
		background: '#ffffff',
		height: '40px',
		width: '180px',
		padding: '8px 14px 8px 14px',
		marginRight: '10px',
		borderRadius: '10px',
		'&:hover': {
			color: 'white',
			background: '#002147',
			cursor: 'pointer',
		},
	},
	tenantCard: {
		width: '100%',
		maxWidth: '810px',
	},
	buttonGrid: {
		justifyContent: 'flex-end',
		textAlign: 'center',
		display: 'flex',
		marginTop: '15px',
	},
	addTenantButton: {
		display: 'flex',
		padding: '8px 16px',
		borderRadius: '10px',
		gap: '8px',
	},
	actionButton: {
		display: 'flex',
		padding: '8px 14px',
		borderRadius: '10px',
		gap: '8px',
		width: '180px',
	},
	tenantTableContainer: {
		textAlign: 'center',
		alignItems: 'center',
	},
	inputStyle: {
		p: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		border: '1px solid #262626',
		borderRadius: '10px',
	},
	tableCell: {
		// padding: '10px',
		fontSize: '24px',
		fontWeight: '700',
		border: 'none',
	},
	tableButton: {
		width: '144px',
		height: '32px',
		padding: '6px 8px, 6px 8px',
		borderRadius: '8px',
		textAlign: 'center',
	},
	chip: {
		padding: '18px',
		fontSize: '15px',
		marginLeft: '1rem',
	},
	tableHeaderCellStyle: {
		bgcolor: 'background.default',
		fontWeight: '600px',
	},
	tableDiv: {
		display: 'flex',
		alignItems: 'center',
	},
	detailsBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	headerText: {
		fontWeight: '600',
		fontSize: '16px',
	},
	headerText2: {
		fontWeight: '500',
		fontSize: '16px',
	},
	headerText3: {
		fontWeight: '500',
		fontSize: '24px',
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
	imageText: {
		fontWeight: '700',
		fontSize: '24px',
		color: 'primary.main',
	},
	headText: {
		fontWeight: '700',
		fontSize: '24px',
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
	IconStyle: {
		position: 'absolute',
		bottom: -4,
		right: -5,
		backgroundColor: 'primary.main',
		color: 'white',
	},
	AvatarStyle: {
		width: 100,
		height: 100,
	},
};
