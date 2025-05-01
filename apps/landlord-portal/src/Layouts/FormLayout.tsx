import { Card, Grid, Typography, SxProps, Box } from '@mui/material';
// import style from './style';
import { FormLayoutStyle } from './style';

type Props = {
	children: React.ReactNode;
	Header?: string;
	sx?: SxProps;
};

const FormLayout = ({ children, Header, sx }: Props) => {
	return (
		<Box sx={FormLayoutStyle.container}>
			<Grid container spacing={1} alignItems='center' justifyContent={'center'}>
				<Card sx={sx}>
					<Grid container spacing={1}>
						<Grid item xs={12} sx={FormLayoutStyle.headerContainer}>
							<Typography sx={FormLayoutStyle.header}>{Header}</Typography>
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
			</Grid>
		</Box>
	);
};

export default FormLayout;
