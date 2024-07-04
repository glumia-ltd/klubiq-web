import { Container } from '@mui/material';
import ViewPort from '../../components/Viewport/ViewPort';
import { Outlet } from 'react-router-dom';
import { AddPropertiesLayout } from '../../Layouts/AddPropertiesLayout/AddPropertiesLayout';

const Property = () => {
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

export default Property;
