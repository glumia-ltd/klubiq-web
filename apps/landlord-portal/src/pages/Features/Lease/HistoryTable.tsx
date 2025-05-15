import { Button } from '@mui/material';
import { DynamicTable } from '@klubiq/ui-components';
import { useTenantActions } from '../../../hooks/page-hooks/tenant-hooks';

type HistoryRow = {
	no: string;
	dueDate: string;
	amount: string;
	action: string;
};

const HistoryTable = () => {
	const { tableSx, tableStyles } = useTenantActions();
	const rows: HistoryRow[] = [
		{
			no: '1234567',
			dueDate: 'April 4, 2024',
			amount: '₦2,000,000',
			action: 'View Lease',
		},
		{
			no: '1234567',
			dueDate: 'April 4, 2024',
			amount: '₦2,000,000',
			action: 'View Lease',
		},
	];

	const handleActionClick = (row: HistoryRow) => {
		console.log('Selected row:', row);
	};

	const columns = [
		{ key: 'no', label: 'Invoice No', align: 'center' as 'center' },
		{ key: 'dueDate', label: 'Due Date', align: 'center' as 'center' },
		{ key: 'amount', label: 'Amount', align: 'center' as 'center' },
		{
			key: 'action',
			label: 'Action',
			align: 'center' as 'center',
			render: (row: HistoryRow) => (
				<Button variant='klubiqTextButton' onClick={() => handleActionClick(row)}>
					{row.action}
				</Button>
			),
		},
	];

	return (
		<DynamicTable
			header='History'
			columns={columns}
			rows={rows}
			styles={tableStyles}
			colors={tableSx}
		/>
	);
};
export default HistoryTable;
