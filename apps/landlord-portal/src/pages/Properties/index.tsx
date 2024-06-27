import { Container } from '@mui/material';
import ViewPort from '../../components/Viewport/ViewPort';
import PropertyCategoryLayout from '../../Layouts/PropertyCategoryLayout';
const Property = () => {
	return (
		<ViewPort>
			<Container maxWidth='xl'>
				<PropertyCategoryLayout />
			</Container>
		</ViewPort>
	);
};

export default Property;
