import { Button } from '@mui/material';
import { DynamicTable } from '@klubiq/ui-components';
import { useTenantActions } from '../../../hooks/page-hooks/tenant-hooks';
import { styles } from './style';
import { ActiveLeaseDetail } from '../../../shared/type';

type HistoryRow = {
	no: string;
	dueDate: string;
	amount: string;
	action: string;
};

type HistoryTableProps = {
	leases: ActiveLeaseDetail[];
};

const HistoryTable = ({ leases }: HistoryTableProps) => {
	const { tableSx, tableStyles } = useTenantActions();

	const rows: HistoryRow[] = leases.map((lease, index) => ({
		no: lease.id || `INV-${index + 1}`,
		dueDate: lease.leaseStart
			? new Date(lease.leaseStart).toDateString()
			: 'N/A',
		amount: lease.rentAmount
			? `₦${Number(lease.rentAmount).toLocaleString()}`
			: 'N/A',
		action: 'View Lease',
	}));

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
			align: 'center' as const,
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
