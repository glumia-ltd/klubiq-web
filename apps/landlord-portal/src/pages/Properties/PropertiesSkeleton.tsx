import { Grid, Skeleton } from '@mui/material';
import { styles } from './styles';
import { data } from './data';
const PropertiesSkeleton = () => {
	return (
		<Grid container spacing={1} sx={styles.container}>
			<Grid item xs={12} sx={styles.firstDiv}>
				<Skeleton variant='rectangular' height={20} width='20px' />
				<Skeleton variant='rectangular' sx={styles.buttonBorder} />
			</Grid>
			<Grid item xs={12}>
				<Skeleton variant='rectangular' sx={styles.inputStyle2} />
			</Grid>
			<Grid item xs={6} sx={styles.filterContainers}>
				<Skeleton variant='rectangular' sx={styles.borders} width='200px' />
				<Skeleton variant='rectangular' sx={styles.borders} width='200px' />
				<Skeleton
					variant='rectangular'
					sx={styles.borders}
					height={45}
					width='200px'
				/>
				<Skeleton
					variant='rectangular'
					sx={styles.borders}
					height={45}
					width='350px'
				/>
				<Skeleton
					variant='rectangular'
					sx={styles.borders}
					height={45}
					width='350px'
				/>
			</Grid>

			<Grid container spacing={1.5} mt={3} pl={0.5}>
				{data.map((_, idx) => (
					<Grid item xs={12} sm={6} md={4} key={idx}>
						<Skeleton variant='rectangular' sx={styles.rowCard} />
					</Grid>
				))}{' '}
			</Grid>
		</Grid>
	);
};

export default PropertiesSkeleton;
