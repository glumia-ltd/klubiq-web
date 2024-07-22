import FormLayout from '../../../Layouts/FormLayout';
import { Grid, Typography } from '@mui/material';
import style from './style';
import { DataGrid } from '@mui/x-data-grid';

const Invoice = () => {
	const columns = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'Purpose',
			headerName: 'Purpose',
			width: 100,
			editable: true,
		},
		{
			field: 'Unit',
			headerName: 'Unit',
			width: 100,
			editable: false,
		},
		{
			field: 'Due',
			headerName: 'Due',
			width: 100,
			editable: false,
		},
		{
			field: 'Quantity',
			headerName: 'Quantity',
			width: 100,
			editable: false,
		},
		{
			field: 'Amount',
			headerName: 'Amount',
			width: 100,
			editable: true,
		},
	];
	const rows = [
		{
			id: 1,
			Purpose: 'Residential',
			Unit: '1b',
			Due: 14,
			Quantity: '12',
			Amount: 5000,
		},
	];
	return (
		<FormLayout Header='Invoice' sx={style.card}>
			<Grid container spacing={2} sx={style.content}>
				<Grid item xs={6} sm={4}>
					<Typography variant='subtitle2' sx={style.infotypo}>
						From
					</Typography>
					<Typography variant='subtitle2' sx={style.typo}>
						Shonekan{' '}
					</Typography>
					<Typography variant='subtitle2' sx={style.typo2}>
						Manager
					</Typography>
					<Typography variant='subtitle2' sx={style.typo3}>
						16b, Palm mall, Maryland, Lagos, Nigeria.{' '}
					</Typography>
					<Typography variant='subtitle2' sx={style.typo4}>
						Tobishonekan@mail.com{' '}
					</Typography>
					<Typography variant='subtitle2' sx={style.infotypo} mt='10px'>
						ISSUED{' '}
					</Typography>
					<Typography variant='subtitle2' sx={style.typo2} mt='10px'>
						April 24, 2025
					</Typography>
				</Grid>
				<Grid item xs={6} sm={4}>
					<Typography variant='subtitle2' sx={style.infotypo}>
						To
					</Typography>
					<Typography variant='subtitle2' sx={style.typo}>
						Shonekan{' '}
					</Typography>
					<Typography variant='subtitle2' sx={style.typo3}>
						Road 4, House 45, Osapa, Lagos{' '}
					</Typography>
					<Typography variant='subtitle2' sx={style.typo4}>
						Tobishonekan@mail.com{' '}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12}>
					<DataGrid
						rows={rows}
						columns={columns}
						// initialState={{
						// 	pagination: {
						// 		paginationModel: {
						// 			pageSize: 5,
						// 		},
						// 	},
						// }}
						// pageSizeOptions={[5]}
						sx={{
							'& .MuiDataGrid-columnHeaders': {
								backgroundColor: 'white',
								color: '#000000', // Change header text color to white
							},
							'& .MuiDataGrid-cell': {
								borderRight: '1px solid rgba(224, 224, 224, 1)', // Add vertical lines between cells
							},
						}}
						// checkboxSelection
						// disableRowSelectionOnClick
						showColumnVerticalBorder={true}
					/>
				</Grid>
			</Grid>
		</FormLayout>
	);
};

export default Invoice;
