import { Container } from '@mui/material';
import ViewPort from '../../components/Viewport/ViewPort';
import { Outlet } from 'react-router-dom';

const Property = () => {
	return (
		<ViewPort>
			<Container maxWidth='xl'>
				Properties
				<Outlet />
			</Container>
		</ViewPort>
	);
};

export default Property;
