import React from 'react';
import { Card, Box, Skeleton } from '@mui/material';

const PaymentMethodCardSkeleton: React.FC = () => (
	<Card
		sx={{ display: 'flex', alignItems: 'center', p: 2, width: '100%', gap: 2 }}
	>
		<Skeleton variant='rounded' width={40} height={20} />
		<Box flex={1}>
			<Skeleton variant='text' width={120} height={28} />
			<Skeleton variant='text' width={100} height={20} />
		</Box>
		<Skeleton variant='rounded' width={60} height={15} />
		<Skeleton variant='rounded' width={32} height={13} />
	</Card>
);

export default PaymentMethodCardSkeleton;
