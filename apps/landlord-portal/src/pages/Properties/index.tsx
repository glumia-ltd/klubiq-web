import { Container } from '@mui/material';
import ViewPort from '../../components/Viewport/ViewPort';
import PropertyCategoryLayout from '../../Layouts/PropertiesCategoryLayout';
import PropertiesFormLayout from '../../Layouts/PropertiesFormLayout';
const Property = () => {
	return (
		<ViewPort>
			<Container maxWidth='xl'>
				{/* <PropertyCategoryLayout /> */}
				<PropertiesFormLayout />
			</Container>
		</ViewPort>
	);
};

export default Property;
