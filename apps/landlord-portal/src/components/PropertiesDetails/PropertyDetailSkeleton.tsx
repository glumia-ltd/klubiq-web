import { Grid, Skeleton } from '@mui/material';
import PropertiesFormStyle from './PropertiesDetailsStyle';

const PropertyDetailSkeleton = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Skeleton variant='text' height={25} width='50%' />
				<Skeleton
					variant='rectangular'
					height={30}
					width='100%'
					sx={PropertiesFormStyle.borders}
				/>
			</Grid>
			<Grid item xs={12}>
				<Skeleton variant='text' height={25} width='50%' />
				<Skeleton
					variant='rectangular'
					height={30}
					width='100%'
					sx={PropertiesFormStyle.borders}
				/>
			</Grid>
			<Grid item xs={12}>
				<Skeleton variant='text' height={25} width='50%' />
				<Skeleton
					variant='rectangular'
					height={300}
					width='100%'
					sx={PropertiesFormStyle.borders}
				/>
			</Grid>
			<Grid item xs={12}>
				<Skeleton
					variant='rectangular'
					height={200}
					width='100%'
					sx={PropertiesFormStyle.borders}
				/>
			</Grid>
		</Grid>
	);
};

export default PropertyDetailSkeleton;
