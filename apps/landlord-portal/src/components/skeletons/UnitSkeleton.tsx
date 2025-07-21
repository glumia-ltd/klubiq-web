import { Grid, Breadcrumbs, Chip, Skeleton, Box, Stack } from '@mui/material';
// import { Container } from '@mui/system';
import { styles } from '../PropertyUnitComponent/style';
// import { HomeIcon } from '../Icons/HomeIcon';
import { Overview } from '../Overview/Overview';
import { TabsComponent } from '../TabsComponent/TabsComponent';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FC, useState } from 'react';
import UnitCardSkeleton from '../UnitCard/UnitCardSkeleton';
import InfoCardSkeleton from '../UnitInfoComponent/InfoCardSkeleton';
import FieldCardSkeleton from '../AddFieldsComponent/FieldCardSkeleton';
import TableSkeleton from '../TenantAndLeaseTable/TableSkeleton';
import { HouseIcon, TenantIcon, VacantHomeIcon } from '../Icons/CustomIcons';
import { DocumentTableComponent } from '../DocumentTableComponent/DocumentTableComponent';
import { PropertyDataType } from '../../shared/type';
import SharedStyles from '../../styles/shared-style';
import UnitInfoCard from '../UnitInfoComponent/UnitInfoCard';

type UnitComponentType = {
	currentProperty?: PropertyDataType;
	tenantTableBodyRows?: any;
	tenantColumns?: any;
	leaseTableBodyRows?: any;
};

const allTabs = ['Overview', 'Lease'];

export const UnitSkeleton: FC<UnitComponentType> = ({
	currentProperty,
	tenantTableBodyRows,
	leaseTableBodyRows,
}) => {
	const [tabValue, setTabValue] = useState<number>(0);

	const propertyType = currentProperty?.isMultiUnit ? 'Multi' : 'Single';

	const unitInfoData = [
		{
			label: 'UNIT',
			imgSrc: HouseIcon,
		},
		{
			label: 'VACANT UNIT',
			imgSrc: VacantHomeIcon,
		},
		{
			label: 'TENANT',
			imgSrc: TenantIcon,
		},
	];

	const handleTabChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setTabValue(newValue);
	};

	return (
		// <Container maxWidth={'xl'} sx={styles.container}>
		<>
			<Stack direction='column' spacing={2} width={'100%'}>
				<Stack>
					<Breadcrumbs
						separator={
							<ArrowForwardIosIcon
								sx={{
									...SharedStyles.iconStyle,
									...SharedStyles.arrowIconStyle,
								}}
							/>
						}
						aria-label='breadcrumb'
						sx={SharedStyles.breadCrumbStyle}
					>
						<Skeleton variant='rectangular' width='30px' height='10px' />

						<Skeleton variant='rectangular' width='90px' height='10px' />
					</Breadcrumbs>
				</Stack>
				<Stack direction='row' justifyContent='flex-end' marginTop='3rem'>
					<Skeleton variant='rectangular' width='100px' height='40px' />
				</Stack>
				{currentProperty?.purpose ? (
					<Chip
						label={currentProperty?.purpose?.displayText || 'For sale'}
						variant={
							currentProperty?.purpose?.name?.toLowerCase() === 'rent'
								? 'rent'
								: 'sale'
						}
					/>
				) : (
					<Box mb={1}>
						<Skeleton width='50px' height='30px' />
					</Box>
				)}
				<UnitCardSkeleton
					numberOfUnits={currentProperty?.isMultiUnit ? 'Multi' : 'Single'}
				/>

				<Stack
					spacing={2}
					mt={2}
					direction={'column'}
					width={'100%'}
					justifyContent={'center'}
				>
					<InfoCardSkeleton data={unitInfoData} />

					<Overview
						initialText={currentProperty?.description}
						propertyUuid={''}
					/>
					<TabsComponent
						handleTabChange={handleTabChange}
						tabValue={tabValue}
						allTabs={allTabs}
					/>
					<FieldCardSkeleton />
					<FieldCardSkeleton />
					<TableSkeleton tableBodyRows={tenantTableBodyRows} />
					<TableSkeleton tableBodyRows={currentProperty?.units} />
				</Stack>

				{/* Multi unit */}
			</Stack>
		</>
		// </Container>
	);
};
