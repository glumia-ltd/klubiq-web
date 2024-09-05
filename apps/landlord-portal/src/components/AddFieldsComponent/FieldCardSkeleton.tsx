import { Grid, Box, Card, Skeleton } from '@mui/material';
import style from './style';

const FieldCardSkeleton = () => {
	return (
		<Card sx={style.contentdiv}>
			<Grid container spacing={1}>
				<Grid item xs={6} sm={6} md={3} lg={3} sx={style.content}>
					<Skeleton variant='circular' sx={style.imageStyle} />
					<Box>
						<Skeleton variant='rectangular' sx={style.skeletonText} />

						<Skeleton variant='rectangular' sx={style.skeletonText2} />
					</Box>
				</Grid>
				<Grid item xs={6} sm={6} md={9} lg={9} sx={style.lastBox}>
					<Skeleton variant='rounded' sx={style.button} />
				</Grid>
			</Grid>
		</Card>
	);
};

export default FieldCardSkeleton;
