import { Grid, Typography, Box, Card, Skeleton } from '@mui/material';
import style from './style';
import { FC } from 'react';

interface DataItem {
	icon?: JSX.Element;
	label: string;
	imgSrc?: any;
}

const InfoCardSkeleton: FC<{ data: DataItem[] }> = ({ data }) => {
	return (
		<Card sx={style.contentdiv}>
			<Grid container spacing={1}>
				{data.map((item, index) => (
					<Grid
						item
						xs={3}
						key={index}
						sx={{
							textAlign: 'center',
							borderRight: index < data.length - 1 ? '1px solid #ddd' : 'none',
						}}
					>
						<Box sx={style.lastBox}>
							<Box sx={style.imageStyle}>
								<item.imgSrc />
							</Box>

							<Typography variant='subtitle1' sx={style.headerText}>
								{item.label}
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Skeleton
									variant='rectangular'
									width={'50px'}
									height={'25px'}
								/>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</Card>
	);
};

export default InfoCardSkeleton;
