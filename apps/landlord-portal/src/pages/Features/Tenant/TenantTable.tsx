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
	console.log('allTenant', allTenant);
	const { tableSx, tableStyles } = useTenantActions();

	const columns: TableColumn[] = [
		{
			key: 'profile',
			label: 'Name',
			align: 'center',
			render: (tenant) => {
				const getDisplayName = (): string => {
					const fullName = tenant?.fullName?.trim();
					const companyName = tenant?.companyName;

					if (fullName) return fullName;
					if (companyName) return companyName;
					return 'N/A';
				};
				return (
					<Box display='flex' alignItems='center' justifyContent='left'>
						<DynamicAvatar
							items={[tenant?.tenant?.__profile__?.profilePicUrl || '']}
							size='medium'
							showName={false}
						/>
						<Typography variant='body2' ml='0.5rem'>
							{getDisplayName()}{' '}
						</Typography>
					</Box>
				);
			},
		},
		{
			key: 'mostRecentPropertyName',
			label: 'Property Name',
			align: 'center',
		},
		{
			key: 'mostRecentUnitName',
			label: 'Unit',
			align: 'center',
		},
		{
			key: 'mostRecentUnitAddress',
			label: 'Address',
			align: 'center',
		},
		{
			key: 'mostRecentPaymentStatus',
			label: 'Status',
			align: 'center',
			render: (tenant) => {
				const status = tenant?.mostRecentPaymentStatus?.status;
				if (!status) return null;
				return (
					<Chip
						label={tenant?.leaseDetails?.status ?? ''}
						color={statusColors[status]}
						variant='outlined'
						sx={styles.chip}
					/>
				);
			},
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
