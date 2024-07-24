import { Grid } from '@mui/material';
import AddTenant from '../../components/MultiUnitForms/TenantForm/AddTenant';
import ViewPort from '../../components/Viewport/ViewPort';

const AddTenantPage = () => {
	return (
		<ViewPort>
			<Grid
				sx={{
					height: '90vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<AddTenant />
			</Grid>
		</ViewPort>
	);
};

export default AddTenantPage;
