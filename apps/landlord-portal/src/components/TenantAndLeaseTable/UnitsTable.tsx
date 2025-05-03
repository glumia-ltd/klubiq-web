/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Typography,
	Stack,
} from '@mui/material';
import { FC, useMemo } from 'react';
import {
	Bedroom,
	Bathroom,
	FloorPlan,
	ShowerIcon,
	EmojiOneBuildingIcon,
} from '../Icons/CustomIcons';
import { UnitType } from '../../shared/type';
import { useNavigate } from 'react-router-dom';
import {
	DynamicTable,
	TableColumn,
	DynamicAvatar,
} from '@klubiq/ui-components';
import { usePropertyActions } from '../../hooks/page-hooks/properties.hooks';

type UnitsTableType = {
	title: string;
	handleAdd?: (path?: string) => void;
	buttonText: string;
	tableBodyRows: any;
};
interface UnitsTableData {
	tableColumns: TableColumn[];
	rows: Array<{
		unitUuid: string;
		unitNumber: string;
		tenants: Array<{
			name?: string;
			image?: string;
		}>;
		floorPlan?: {
			value: number;
			unit: string;
		};
		details?: {
			offices: number;
			bedrooms: number;
			rooms: number;
			bathrooms: number;
			toilets: number;
		};
	}>;
}

export const UnitsTable: FC<UnitsTableType> = ({
	handleAdd,
	buttonText,
	tableBodyRows,
	title,
}) => {
	const navigate = useNavigate();
	const getUnitTableData = (units: UnitType[]): UnitsTableData => {
		const tableColumns: TableColumn[] = [
			{
				key: 'unitNumber',
				label: 'Unit',
				align: 'left',
				render: (rowData: any) => (
					<Typography variant='body2'>{rowData.unitNumber}</Typography>
				),
			},
			{
				key: 'tenant',
				label: 'Tenants',
				align: 'left',
				render: (rowData: any) => (
					<Stack direction='row' alignItems='center' spacing={2}>
						<DynamicAvatar
							items={rowData.tenants}
							size='medium'
							showName={false}
						/>
						{rowData.tenants.length === 1 && (
							<Typography variant='body2'>{rowData.tenants[0].name}</Typography>
						)}
					</Stack>
				),
			},
			{
				key: 'floorPlan',
				label: 'Floor Plan',
				align: 'left',
				render: (rowData: any) => (
					<Stack direction={'row'} alignItems={'center'}>
						<FloorPlan />
						<Typography variant='subtitle2'>
							{rowData?.floorPlan?.value} {rowData?.floorPlan?.unit}
						</Typography>
					</Stack>
				),
			},

			{
				key: 'details',
				label: 'Details',
				align: 'left',
				render: (rowData: any) => (
					<Stack direction={'row'} spacing={2}>
						{rowData?.details?.offices > 0 && (
							<>
								<EmojiOneBuildingIcon />
								{rowData?.details?.offices}
							</>
						)}
						{rowData?.details?.bedrooms > 0 && (
							<>
								<Bedroom />
								{rowData?.details?.bedrooms}
							</>
						)}
						{rowData?.details?.rooms > 0 && (
							<>
								<Bedroom />
								{rowData?.details?.rooms}
							</>
						)}
						{rowData?.details?.bathrooms > 0 && (
							<>
								<ShowerIcon />
								{rowData?.details?.bathrooms}
							</>
						)}
						{rowData?.details?.toilets > 0 && (
							<>
								<Bathroom />
								{rowData?.details?.toilets}
							</>
						)}
					</Stack>
				),
			},
		];
		const rows =
			units?.map((unit) => ({
				unitUuid: unit.id ?? '',
				unitNumber: unit.unitNumber ?? '',
				tenants:
					unit?.tenants?.map((tenant) => ({
						name:
							`${tenant.profile.firstName} ${tenant.profile.lastName}` ||
							'Tenant',
						image: tenant.profile?.profilePicUrl ?? '',
					})) || [],
				floorPlan: {
					value: Number(unit?.area?.value) ?? 0,
					unit: unit?.area?.unit ?? '',
				},
				details: {
					offices: Number(unit?.offices) || 0,
					bedrooms: Number(unit?.bedrooms) || 0,
					rooms: Number(unit?.rooms) || 0,
					bathrooms: Number(unit?.bathrooms) || 0,
					toilets: Number(unit?.toilets) || 0,
				},
			})) ?? [];
		return { tableColumns, rows };
	};
	const { tableSx, tableStyles } = usePropertyActions();
	const unitTableData = useMemo(
		() => getUnitTableData(tableBodyRows),
		[tableBodyRows],
	);

	const handleUnitClick = (id: string | number, unitNumber: string) => {
		navigate(`unit/${id}`, {
			state: {
				mode: 'multi-unit',
				unitUuid: id,
				returnPath: `/properties`,
				multiUnitNumber: unitNumber,
			},
		});
	};
	const handleButtonClick = () => {
		handleAdd && handleAdd('');
	};

	return (
		<DynamicTable
			//showHeader={false}
			columns={unitTableData.tableColumns}
			rows={unitTableData.rows || []}
			colors={tableSx}
			styles={tableStyles}
			header={title}
			buttonLabel={buttonText}
			onButtonClick={handleButtonClick}
			onRowClick={(rowData: any) => handleUnitClick(rowData?.unitUuid, rowData?.unitNumber)}
		/>
	);
};
