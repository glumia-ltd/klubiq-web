import setupImg from '../../../assets/images/mfa-setup.png';
export const styles = {
	splitScreenStyle: {
		borderColor: 'secondary.light',
		borderTopRightRadius: '1.3rem',
		borderBottomLeftRadius: '1.3rem',
		height: '100vh',
		background: `url(${setupImg})`,
		backgroundColor: 'white',
		backgroundSize: '50% 40%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundBlendMode: 'normal',
		display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
	},
	cancelEnrollStyle: {
		backgroundColor: 'secondary.light',
		color: 'white',
	},
	enrollActionContainerStyle: {
		marginTop: '1rem',
		justifyContent: 'flex-end',
	},
	avatarBulletStyle: {
		width: '30px',
		height: '30px',
		bgcolor: 'secondary.light',
	},
	qrBox: {
		height: 'auto',
		margin: '0 auto',
		width: '40%',
	},
	qr: {
		height: 'auto',
		maxWidth: '100%',
		width: '100%',
	},
	stackContainer: {
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	leftSplit: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '33rem',
		p: 1,
	},
	gridContainer: {
		height: '100vh',
		justifyContent: 'center',
		p: {
			xs: 1,
			sm: 1,
			md: 0,
			lg: 0,
		},
		overflow: 'hidden',
	},
};
