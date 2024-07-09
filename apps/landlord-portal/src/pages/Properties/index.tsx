import { Container } from '@mui/material';
import ViewPort from '../../components/Viewport/ViewPort';
import { AddPropertiesLayout } from '../../Layouts/AddPropertiesLayout/AddPropertiesLayout';
import { Outlet } from 'react-router-dom';
import ViewPropertiesLayout from '../../Layouts/ViewPropertiesLayout';
const Property = () => {
	return (
		<ViewPort>
			<Container maxWidth='xl'>
				{/* <AddPropertiesLayout>
					<Outlet />
				</AddPropertiesLayout> */}
				<ViewPropertiesLayout />
			</Container>
		</ViewPort>
	);
};

export default Property;
