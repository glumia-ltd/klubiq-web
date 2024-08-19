import { Skeleton } from '@mui/material';

export const FilterSkeleton = () => {
	return (
		<Skeleton
			width='9.5%'
			height={40}
			variant='rectangular'
			sx={{ borderRadius: '8px ' }}
		/>
	);
};
