import { Typography, Box } from '@mui/material';
import { styles } from './styles';
import fileIcon from '../../assets/images/Vector (2).svg';
import { useTenantActions } from '../../hooks/page-hooks/tenant-hooks';
import { DynamicTable } from '@klubiq/ui-components';

type TenantDocumentRow = {
	name: string;
	dueDate: string;
};

const TenantDocument = () => {
	const { tableSx, tableStyles } = useTenantActions();

	const rows: TenantDocumentRow[] = [
		{ name: 'Maintenance fee', dueDate: 'March 13, 2025' },
		{ name: 'Insurance fee', dueDate: 'April 4, 2024' },
		{ name: 'Landmark House unit 1 Lease payment', dueDate: 'March 13, 2025' },
		{ name: 'Landmark House unit 2 Lease payment', dueDate: 'April 4, 2024' },
	];

	const columns = [
		{
			key: 'name',
			label: 'Name',
			render: (name: { name: string }) => (
				<Box sx={styles.tableDiv} display='flex' alignItems='center'>
					<img src={fileIcon} alt='file icon' />
					<Typography sx={styles.cellText} ml='25px'>
						{name.name}
					</Typography>
				</Box>
			),
		},
		{ key: 'dueDate', label: 'Due Date' },
	];
	return (
		<DynamicTable
			header='Tenant Documents'
			subHeader='Keep track of all documents related to this property in one place.'
			columns={columns}
			rows={rows}
			styles={tableStyles}
			colors={tableSx}
		/>
	);
};

export default TenantDocument;
