import { Chip, Typography, Stack } from '@mui/material';
import { FC } from 'react';
import { TenantType } from '../../../shared/type';
import {
	DynamicTable,
	TableColumn,
	DynamicAvatar,
} from '@klubiq/ui-components';
import { useTenantActions } from '../../../hooks/page-hooks/tenant-hooks';
import { TenantList } from '../../../page-tytpes/tenants/tenant-details';
import { UnitTypeColors } from '../../../page-tytpes/leases/list-page.type';

type TenantTableProps = {
	title: string;
	allTenant: TenantList[];
	onRowClick?: (tenant: TenantType) => void;
};

const statusColors: Record<string, 'success' | 'warning' | 'error'> = {
	Paid: 'success',
	Pending: 'warning',
	Unpaid: 'error',
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
							items={[
								{ id: tenant?.id ?? getDisplayName(), name: getDisplayName() },
							]}
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
			render: (tenant: any) =>
				tenant.mostRecentLeaseId && (
					<Stack direction='column' alignItems='flex-start' spacing={1}>
						{tenant.isMultiUnitProperty && (
							<Typography variant='body2'>{tenant.unit}</Typography>
						)}
						<Chip
							label={tenant.isMultiUnitProperty ? 'Multi' : 'Single'}
							size='small'
							variant='outlined'
							color={
								UnitTypeColors[
									tenant.isMultiUnitProperty ? 'Multi' : 'Single'
								] as any
							}
						/>
					</Stack>
				),
		},
		{
			key: 'mostRecentPropertyAddress',
			label: 'Address',
			align: 'left',
			render: (tenant) => {
				if (!tenant.mostRecentPropertyAddress) {
					return null;
				}
				return <Typography variant='subtitle2'>{tenant.mostRecentPropertyAddress}</Typography>;
			},
		},
		{
			key: 'mostRecentPaymentStatus',
			label: 'Payment Status',
			align: 'left',
			render: (tenant) => {
				if (!tenant.mostRecentLeaseId || !tenant.mostRecentPaymentStatus) {
					return null;
				}
				return (
					<Chip
						label={tenant.mostRecentPaymentStatus || ''}
						color={statusColors[tenant.mostRecentPaymentStatus]}
						variant='outlined'
						size='small'
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
