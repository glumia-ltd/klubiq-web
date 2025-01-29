import cityillustration from '../assets/images/undraw_city_life_gnpr-removebg-preview.png';
const style = {
	container: {
		//overflow: 'auto',
		paddingTop: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
		paddingBottom: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
	},
	card: {
		width: '100%',
		maxWidth: '810px',
	},
	headerContainer: {
		backgroundColor: 'primary.main',
		color: 'white',
		width: '100%',
		alignItems: 'center',
		height: '100px',
		borderRadius: '0px, 0px, 3px, 0px',
	},
	header: {
		fontSize: { xs: '13px', sm: '18px', md: '20px', lg: '32px' },
		lineHeight: { xs: '20px', sm: '20px', md: '24px', lg: '38px' },
		textTransform: 'uppercase',
		fontWeight: 700,
		textAlign: 'left',
		marginTop: '31px',
		marginLeft: '32px',
		gap: '416px',
	},
	background: {
		background: `linear-gradient(#6699CC, #1F305E), url(${cityillustration})`,
		backgroundBlendMode: 'overlay',
		backgroundSize: 'fixed',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'bottom',
	},
	leaseHeader: {
		fontSize: { xs: '13px', sm: '18px', md: '20px', lg: '24px' },
		lineHeight: { xs: '20px', sm: '20px', md: '24px', lg: '38px' },
		textTransform: 'ccapitalize',
		fontWeight: 700,
		textAlign: 'left',
		marginTop: '31px',
		marginLeft: '32px',
		gap: '416px',
	},
};
export default style;
