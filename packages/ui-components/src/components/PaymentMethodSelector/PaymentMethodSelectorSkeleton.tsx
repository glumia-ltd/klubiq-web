import { Skeleton, Box } from '@mui/material';

export const PaymentMethodSelectorSkeleton = (rows: number) => (
	<Box>
		{[...Array(rows)].map((_, i) => (
			<Skeleton
				key={i}
				variant='rectangular'
				height={56}
				sx={{ mb: 2, borderRadius: 2 }}
			/>
		))}
	</Box>
);
