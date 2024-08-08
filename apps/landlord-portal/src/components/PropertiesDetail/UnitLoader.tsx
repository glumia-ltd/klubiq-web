import { Grid, Skeleton } from '@mui/material';
import style from './style';
const UnitLoader = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Skeleton
					variant='rectangular'
					height={317}
					width='100%'
					sx={style.borders}
				>
					<Skeleton variant='text' height={25} width='50%' sx={style.new} />
				</Skeleton>
			</Grid>
			<Grid item xs={12}>
				<Skeleton
					variant='rectangular'
					height={257}
					width='100%'
					sx={style.borders}
				/>
			</Grid>
			<Grid item xs={12}>
				<Skeleton
					variant='rectangular'
					height={538}
					width='100%'
					sx={style.borders}
				/>
			</Grid>
		</Grid>
	);
};

export default UnitLoader;
