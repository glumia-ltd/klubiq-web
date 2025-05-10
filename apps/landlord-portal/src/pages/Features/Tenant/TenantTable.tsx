import { Chip, Typography, Box } from '@mui/material';
import { FC } from 'react';
import { styles } from './styles';
import { TenantType } from '../../../shared/type';
import {
	DynamicTable,
	TableColumn,
	DynamicAvatar,
} from '@klubiq/ui-components';
import { useTenantActions } from '../../../hooks/page-hooks/tenant-hooks';

type TenantTableProps = {
	title: string;
	allTenant: TenantType[];
	onRowClick?: (tenant: TenantType) => void;
};

const statusColors: Record<string, 'success' | 'warning' | 'error'> = {
	Paid: 'success',
	Pending: 'warning',
	Overdue: 'error',
};

export const TenantTable: FC<TenantTableProps> = ({
	title,
	allTenant,
	onRowClick,
}) => {
	const { tableSx, tableStyles } = useTenantActions();

	const columns: TableColumn[] = [
		{
			key: 'profile',
			label: 'Name',
			align: 'center',
			render: (tenant) => (
				<Box display='flex' alignItems={'center'} justifyContent={'center'}>
					<DynamicAvatar
						items={[tenant?.profile?.profilePicUrl || '']}
						size='medium'
						showName={false}
					/>
					<Typography variant='body2' ml='0.5rem'>
						{`${tenant?.profile?.firstName || 'Name'} ${tenant?.profile?.lastName || 'name'}`.trim()}
					</Typography>
				</Box>
			),
		},
		{
			key: 'propertyDetails.name',
			label: 'Property',
			align: 'center',
		},
		{
			key: 'propertyDetails.unitNumber',
			label: 'Unit',
			align: 'center',
		},
		{
			key: 'propertyDetails.address.addressLine1',
			label: 'Address Line 1',
			align: 'center',
		},
		{
			key: 'propertyDetails.address.addressLine2',
			label: 'Address Line 2',
			align: 'center',
		},
		{
			key: 'leaseDetails.status',
			label: 'Status',
			align: 'center',
			render: (tenant) => (
				<Chip
					label={tenant?.leaseDetails?.status ?? 'Unknown'}
					color={statusColors[tenant?.leaseDetails?.status ?? '']}
					variant='outlined'
					sx={styles.chip}
				/>
			),
		},
	];

	return (
		<DynamicTable
			header={title}
			columns={columns}
			rows={allTenant}
			onRowClick={(row) => onRowClick?.(row)}
			styles={tableStyles}
			colors={tableSx}
		/>
	);
};