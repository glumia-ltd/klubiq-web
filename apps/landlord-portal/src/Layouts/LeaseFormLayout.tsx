import { Card, Grid, Typography, SxProps, Stack } from '@mui/material';
import style from './style';

type Props = {
	children: React.ReactNode;
	Header?: string;
	sx?: SxProps;
};

const LeaseFormLayout = ({ children, Header, sx }: Props) => {
	return (
		<>
			<Stack spacing={1} alignItems='center' justifyContent={'center'}>
				<Card sx={sx}>
					{' '}
					<Grid container spacing={1}>
						<Grid item xs={12} sx={style.headerContainer}>
							<Typography sx={style.leaseHeader}>{Header}</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							sx={{
								borderRadius: '0px, 0px, 3px, 0px',
							}}
						>
							{children}
						</Grid>
					</Grid>
				</Card>
			</Stack>
		</>
	);
};

export default LeaseFormLayout;
