import { Box } from '@mui/material';

const MonnifyPaymentPage = () => {
	return (
		<Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ flex: 1, position: 'relative' }}>
				<iframe
					src={'https://www.klubiq.com'}
					title='Payment Gateway'
					style={{
						width: '100%',
						height: '100%',
						border: 'none',
						display: 'block',
					}}
					sandbox='allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox'
					allow='payment'
				/>
			</Box>
		</Box>
	);
};

export default MonnifyPaymentPage;
