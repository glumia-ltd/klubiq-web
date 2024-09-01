import { Container } from '@mui/material';
import { AddPropertiesLayout } from '../../Layouts/AddPropertiesLayout/AddPropertiesLayout';
import { Outlet } from 'react-router-dom';
import { styles } from './style';

const AddProperties = () => {
	return (
		<Container maxWidth='xl' sx={styles.container}>
			<AddPropertiesLayout>
				<Outlet />
			</AddPropertiesLayout>
		</Container>
	);
};

export default AddProperties;
