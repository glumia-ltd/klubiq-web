import setupImg from '../../assets/images/mfa-setup.png';
export const styles = {
	splitScreenStyle: {
		borderTop: '2px solid',
		borderBottom: '2px solid',
		borderColor: 'secondary.light',
		borderRadius: '1rem',
		width: '40%',
		height: '95%',
		background: `url(${setupImg})`,
		backgroundColor: 'white',
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		position: 'relative',
		borderTopRightRadius: '16px',
		borderBottomRightRadius: '1rem',
		backgroundBlendMode: 'normal',
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
		paddingLeft: {
			xs: 0,
			sm: '1rem',
			md: '2rem',
			lg: '5rem',
		},
	},
	gridContainer: {
		height: '100vh',
		p: 2,
		paddingRight: {
			xs: 0,
			sm: '1rem',
			md: '2rem',
			lg: '5rem',
		},
	},
};
