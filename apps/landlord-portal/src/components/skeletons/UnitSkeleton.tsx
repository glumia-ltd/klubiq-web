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
import {
	HouseIcon,
	TenantIcon,
	VacantHomeIcon,
} from '../Icons/CustomIcons';
import { DocumentTableComponent } from '../DocumentTableComponent/DocumentTableComponent';
import { PropertyDataType } from '../../shared/type';
import SharedStyles from '../../styles/shared-style';

type UnitComponentType = {
	currentProperty?: PropertyDataType;
	tenantTableBodyRows?: any;
	tenantColumns?: any;
	leaseTableBodyRows?: any;
};

const allTabs = ['Overview', 'Lease', 'Document'];

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
			<Grid>
				<Grid>
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
				</Grid>
				<Grid sx={styles.actionButtonContainerStyle}>
					<Skeleton variant='rectangular' width='100px' height='40px' />
				</Grid>
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
						<Skeleton  width='50px' height='30px' />
					</Box>
					
				)}

				<Grid sx={styles.firstCardContainer}>
					<UnitCardSkeleton
						numberOfUnits={currentProperty?.isMultiUnit ? 'Multi' : 'Single'}
					/>

					{/* Render conditionally based on property type */}

					{propertyType === 'Single' && (
						<TabsComponent
							handleTabChange={handleTabChange}
							tabValue={tabValue}
							allTabs={allTabs}
						/>
					)}
				</Grid>

				{/* SINGLE UNIT OVERVIEW AND LEASE CONTENTS */}
				{propertyType === 'Single' && (tabValue === 0 || tabValue === 1) && (
					<Stack>
						<InfoCardSkeleton data={unitInfoData} />

						<Overview initialText={currentProperty?.description} propertyUuid={''} />

						{/* Single unit table and add cards */}

						{
							<Grid sx={styles.addfieldStyle}>
								{tabValue !== 1 && (
									<>
										{tenantTableBodyRows?.length > 0 && (
											<TableSkeleton tableBodyRows={tenantTableBodyRows} />
										)}

										{!tenantTableBodyRows?.length && <FieldCardSkeleton />}
									</>
								)}

								{!leaseTableBodyRows?.length && <FieldCardSkeleton />}
							</Grid>
						}
					</Stack>
				)}

				{/* Multi unit */}

				{propertyType === 'Multi' && (
					<Stack>
						<InfoCardSkeleton data={unitInfoData} />

						<Overview initialText={currentProperty?.description} propertyUuid={''} />

						<Grid sx={styles.addfieldStyle}>
							{currentProperty?.units && currentProperty?.units?.length > 0 && (
								<TableSkeleton tableBodyRows={currentProperty?.units} />
							)}
							{currentProperty?.units &&
							currentProperty?.units?.length > 0 ? null : (
								<FieldCardSkeleton />
							)}
						</Grid>
					</Stack>
				)}

				{/* MAINTENANCE TAB */}

				{/* DOCUMENT TAB */}

				{tabValue === 3 && <DocumentTableComponent documentTableData={[]} />}
			</Grid>
		</>
		// </Container>
	);
};
