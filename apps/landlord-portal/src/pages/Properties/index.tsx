import { Container } from '@mui/material';
import ViewPort from '../../components/Viewport/ViewPort';
import PropertiesDetailsForm from '../../Layouts/PropertiesDetail';
import { AddPropertiesLayout } from '../../Layouts/AddPropertiesLayout/AddPropertiesLayout';
import { Outlet } from 'react-router-dom';
// import PropertyCategoryLayout from '../../Layouts/PropertiesCategoryLayout';
// import PropertiesFormLayout from '../../Layouts/PropertiesFormLayout';
const Property = () => {
	return (
		<ViewPort>
			<Container maxWidth='xl'>
				<AddPropertiesLayout>
					<Outlet />
				</AddPropertiesLayout>

				{/* <PropertyCategoryLayout /> */}
				{/* <PropertiesFormLayout /> */}
				<PropertiesDetailsForm />
			</Container>
		</ViewPort>
	);
};

export default Property;
