import { Card, Stack, Typography } from '@mui/material';
import { styles } from './style';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import { useFormik } from 'formik';
import ControlledTextField from '../ControlledComponents/ControlledTextField';
const DocumentUploadCard = () => {
	const property = [
		{
			value: '1',
			label: 'Open Document',
		},
		{
			value: '2',
			label: 'A',
		},
		{
			value: '3',
			label: 'B',
		},
	];

	type formValuesType = {
		openDocument: string;
		closedDocument: string;
	};

	const onSubmit = async (values: formValuesType) => {
		console.log(values, 'hh');
	};
	const formik = useFormik({
		initialValues: {
			openDocument: 'A',
			closedDocument: '',
		},
		onSubmit,
	});

	return (
		<Stack spacing={3} width='100%'>
			<Card sx={styles.container}>
				<Stack spacing={2} direction='column'>
					<Stack direction='row' spacing={2.5}>
						<Typography sx={styles.typoText}>Document</Typography>
					</Stack>{' '}
					<Stack spacing={2} direction={'column'}>
						<ControlledSelect
							name='openDocument'
							placeholder='Open Document'
							type='text'
							formik={formik}
							options={property}
							// inputProps={{
							// 	sx: {
							// 		height: '40px',
							// 	},
							// }}
						/>
						<ControlledTextField
							name='closedDocument'
							placeholder='Closed Document'
							// type='file'
							formik={formik}
						/>
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
};

export default DocumentUploadCard;
