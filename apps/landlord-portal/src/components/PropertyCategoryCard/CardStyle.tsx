import { display } from '@mui/system';

const styles = {
	card: {
		height: '290px',
		padding: { xs: '5px', sm: '15px', md: '25px', lg: '25px' },
		borderRadius: '10px',
		maxWidth: '320px',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		textAlign: 'center',
		display: 'flex',
	},
	selectedCard: {
		height: '290px',
		padding: { xs: '5px', sm: '15px', md: '25px', lg: '25px' },
		borderRadius: '10px',
		background: 'primary.main',
		// outline: `1px solid primary.main`,
		cursor: 'pointer',
		maxWidth: '320px',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		display: 'flex',
	},
	imageStyle: {
		width: { xs: '25px', sm: '36px', md: '50px', lg: '60px' },
		height: { xs: '20px', sm: '36px', md: '50px', lg: '60px' },
	},
	header: {
		fontWeight: '500',
		fontSize: { xs: '11px', sm: '18px', md: '24px', lg: '24px' },
		lineHeight: { xs: '11px', sm: '18px', md: '24px', lg: '32px' },
	},
	subtext: {
		fontSize: { xs: '12px', sm: '15px', md: '18px', lg: '18px' },
		lineHeight: { xs: '12px', sm: '18px', md: '18px', lg: '28px' },
		fontWeight: '400px',
	},
};
export default styles;
