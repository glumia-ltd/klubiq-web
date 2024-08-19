import { Skeleton } from '@mui/material';

const filters = [1, 2, 3, 4, 5];

export const FilterSkeleton = () => {
	return (
		<div style={{ marginTop: '16px', display: 'flex', gap: '14px' }}>
			{filters.map((filter) => {
				return (
					<Skeleton
						key={filter}
						width='9.5%'
						height={40}
						variant='rectangular'
						sx={{ borderRadius: '8px ' }}
					/>
				);
			})}
		</div>
	);
};
