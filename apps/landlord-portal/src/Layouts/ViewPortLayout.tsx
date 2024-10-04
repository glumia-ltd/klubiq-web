import { Outlet } from 'react-router-dom';
import ViewPort from '../components/Viewport/ViewPort';

const ViewPortLayout = () => {
	return (
		<ViewPort>
			<Outlet />
		</ViewPort>
	);
};

export default ViewPortLayout;
