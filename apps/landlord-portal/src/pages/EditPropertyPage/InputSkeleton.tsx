import { Skeleton } from '@mui/material';

export const InputSkeleton = () => {
	return (
		<>
			<Skeleton height={'20px'} width={'20%'} />
			<Skeleton height={'60px'} width={'100%'} />
		</>
	);
};
