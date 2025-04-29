import { Outlet } from 'react-router-dom';
import ViewPort from '../components/Viewport/ViewPort';
import { Container } from '@mui/material';
import style from './style';

const ViewPortLayout = () => {
	return (
		<ViewPort>
			<Container maxWidth={'xl'} sx={style.container}>
				<Outlet />
			</Container>
		</ViewPort>
	);
};

export default ViewPortLayout;
