import { Chip, Typography,Stack } from '@mui/material';
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
			align: 'left',
			render: (tenant) => {
				const getDisplayName = (): string => {
					const fullName = tenant?.fullName?.trim();
					const companyName = tenant?.companyName;

					if (fullName) return fullName;
					if (companyName) return companyName;
					return 'N/A';
				};
				return (
					<Stack direction='row' alignItems='center' spacing={2}>
							<DynamicAvatar
								items={[{ id: tenant?.id ?? getDisplayName(), name: getDisplayName() }]}
								size='medium'
								showName={false}
							/>
						<Typography
							variant='body2'
							whiteSpace='nowrap'
							overflow='hidden'
							textOverflow='ellipsis'
						>
							{getDisplayName()}{' '}
						</Typography>
					</Stack>  
				);
			},
		},
		{
			key: 'mostRecentPropertyName',
			label: 'Property Name',
			align: 'left',
		},
		{
			key: 'mostRecentUnitName',
			label: 'Unit',
			align: 'left',
		},
		{
			key: 'mostRecentUnitAddress',
			label: 'Address',
			align: 'left',
		},
		{
			key: 'mostRecentPaymentStatus',
			label: 'Status',
			align: 'left',
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
