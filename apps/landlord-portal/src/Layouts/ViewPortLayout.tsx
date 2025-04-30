import { Outlet } from 'react-router-dom';
import ViewPort from '../components/Viewport/ViewPort';
import { Container } from '@mui/material';
import style from './style';
import { motion } from 'framer-motion';
const ViewPortLayout = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<ViewPort>
				<Container maxWidth={'xl'} sx={style.container}>
					<Outlet />
				</Container>
			</ViewPort>
		</motion.div>
	);
};

export default ViewPortLayout;
