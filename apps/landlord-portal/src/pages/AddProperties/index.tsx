import { Container } from '@mui/material';
import { AddPropertiesLayout } from '../../Layouts/AddPropertiesLayout/AddPropertiesLayout';
import { styles } from './style';

const AddProperties = () => {
	return (
		<Container maxWidth='xl' sx={styles.container}>
			<AddPropertiesLayout />
		</Container>
	);
};

export default AddProperties;
