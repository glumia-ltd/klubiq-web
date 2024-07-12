import { Container } from '@mui/material';
import ViewPort from '../../components/Viewport/ViewPort';
import { AddPropertiesLayout } from '../../Layouts/AddPropertiesLayout/AddPropertiesLayout';
import { Outlet } from 'react-router-dom';
const AddProperties = () => {
	return (
		<ViewPort>
			<Container maxWidth='xl'>
				<AddPropertiesLayout>
					<Outlet />
				</AddPropertiesLayout>
			</Container>
		</ViewPort>
	);
};

export default AddProperties;
