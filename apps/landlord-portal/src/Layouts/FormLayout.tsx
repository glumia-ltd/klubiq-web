import { Card, Grid, Typography } from '@mui/material';
import { Children } from 'react';

type Props = {};

const FormLayout = (props: Props) => {
	return (
		<Grid container spacing={1} alignItems='center' justifyContent={'center'}>
			<Card
				sx={{
					border: '1px solid red',
					// backgroundColor: 'primary.main',
					// color: 'white',
					width: '100%',
					maxWidth: '810px',
				}}
			>
				{' '}
				<Grid container spacing={1}>
					<Grid
						item
						xs={12}
						sx={{
							border: '1px solid red',
							backgroundColor: 'primary.main',
							color: 'white',
							width: '100%',
							maxWidth: '810px',
							height: '100px',
							borderRadius: '0px, 0px, 3px, 0px',
						}}
					>
						<Typography>here ,{/* {Header} */}</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						sx={{
							border: '1px solid red',
							// backgroundColor: 'primary.main',
							// color: 'white',
							// width: '100%',
							// maxWidth: '810px',
							height: '1034px',
							borderRadius: '0px, 0px, 3px, 0px',
						}}
					>
						{/* {Children} */}
						<Grid container spacing={0}>
							here we are
						</Grid>
					</Grid>
				</Grid>
			</Card>
		</Grid>
	);
};

export default FormLayout;
