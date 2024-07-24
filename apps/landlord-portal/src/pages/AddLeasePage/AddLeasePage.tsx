import { Grid } from '@mui/material';
import AddLeaseForm from '../../components/SingleUnitForms/LeaseInfoForm/AddLeaseForm';
import ViewPort from '../../components/Viewport/ViewPort';

const AddLeasePage = () => {
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
				<AddLeaseForm />
			</Grid>
		</ViewPort>
	);
};

export default AddLeasePage;
