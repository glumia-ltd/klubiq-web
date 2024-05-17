import { Container, Grid, Card } from '@mui/material';

// type DashProps = {}

const DashBoard = () => {
	return (
		<Container maxWidth='xl'>
			<Grid container spacing={1} sx={{ display: 'flex' }}>
				<Grid container item spacing={1} xs={10}>
					<Grid item xs={4}>
						<Card sx={{ border: '2px solid yellow', height: '150px' }}>
							Content for the first column
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card sx={{ border: '2px solid yellow', height: '150px' }}>
							Content for the second column
						</Card>
					</Grid>

					<Grid item xs={4}>
						<Card sx={{ border: '2px solid yellow', height: '150px' }}>
							Content for the third column
						</Card>
					</Grid>
					<Grid item xs={8}>
						<Card sx={{ border: '2px solid yellow', height: '130px' }}>
							Content for the fourth column
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card sx={{ border: '2px solid yellow', height: '130px' }}>
							5th
						</Card>
					</Grid>
				</Grid>
				<Grid container item xs={2}>
					<Grid item xs={12} sx={{ border: '2px solid pink' }}>
						<Card sx={{ border: '2px solid yellow', height: '280px' }}>
							6th
						</Card>
					</Grid>
				</Grid>
			</Grid>
			<Grid container spacing={0}>
				<Grid
					item
					xs={12}
					md={12}
					lg={12}
					sx={{ border: '2px solid green', height: '210px' }}
				>
					table
				</Grid>
			</Grid>
		</Container>
	);
};
export default DashBoard;
