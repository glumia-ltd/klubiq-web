import { Grid } from '@mui/material';
import Maintenance from '../../components/SingleUnitForms/Maintenance/MaintenanceForm';
import ViewPort from '../../components/Viewport/ViewPort';

const AddMaintenancePage = () => {
	return (
		<ViewPort>
			<Grid
				sx={{
					minHeight: '90vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '20px',
				}}
			>
				<Maintenance />
			</Grid>
		</ViewPort>
	);
};

export default AddMaintenancePage;
