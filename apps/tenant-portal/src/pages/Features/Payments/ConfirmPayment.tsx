import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { MonnifyPaymentData, PaymentData, PaymentProviders } from '@/shared/types/data.types';
// import { useGetLeaseInsightsQuery } from '@/store/GlobalStore/insightsApi.slice';
// import { PaymentFrequency } from '@/helpers/utils';


const ConfirmPayment: React.FC = () => {
	const [iframeLoading, setIframeLoading] = useState(true);
	const { paymentData } = useLocation().state as { paymentData: PaymentData };

	return (
		<Box
			sx={{
				bgcolor: 'background.default',
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* Header */}
			<Box sx={{ mb: 3, textAlign: 'center' }}>
				<Typography variant='h5' sx={{ mb: 1 }}>
					Confirm Payment
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Complete your payment securely
				</Typography>
			</Box>

			{/* iframe Container */}
			<Box
				// elevation={0}
				sx={{
					width: '100%',
					maxWidth: 800,
					margin: '0 auto',
					overflow: 'hidden',
					borderRadius: 0,
				}}
			>
				{iframeLoading && (
					<CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
				)}
				{paymentData?.providerData?.provider === PaymentProviders.monnify && (
				<iframe
					src={(paymentData.providerData as MonnifyPaymentData).checkoutUrl}
					title='Payment Confirmation'
					width='100%'
					height='650'
					id='monnify-iframe'
					onLoad={() => setIframeLoading(false)}
					allow='payment'
						sandbox='allow-forms allow-scripts allow-same-origin allow-top-navigation'
					/>
				)}
			</Box>
		</Box>
	);
};

export default ConfirmPayment;
