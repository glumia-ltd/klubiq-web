import {
	Grid,
	Breadcrumbs,
	SvgIcon,
	Typography,
	Button,
	Chip,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import { Container, Box } from '@mui/system';
import AddFieldCard from '../AddFieldsComponent/AddFieldCard';
import { styles } from './style';
import { HomeIcon } from '../Icons/HomeIcon';
import { MaintenanceIcon } from '../Icons/MaintenanceIcon';
import { Overview } from '../Overview/Overview';
import { TabsComponent } from '../TabsComponent/TabsComponent';
import { TenantAndLeaseTable } from '../TenantAndLeaseTable/TenantAndLeaseTable';
import { UnitsTable } from '../TenantAndLeaseTable/UnitsTable';
import { UnitCard } from '../UnitCard/UnitCard';
import UnitInfoCard from '../UnitInfoComponent/UnitInfoCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { FC, useState } from 'react';
import { HouseIcon, TenantIcon, VacantHomeIcon } from '../Icons/CustomIcons';
import propertyImage from '../../assets/images/propertyImage.png';
import addMaintenance from '../../assets/images/addMaintenance.svg';

type PropertyUnitComponentType = {
	handleHomeClick?: () => void;
	handleTabChange?: (
		event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => void;
	handleNavigation?: (path?: string) => void;
	handleMaintenanceTabChange?: (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => void;
	currentProperty: any;
	propertyType: 'Single' | 'Multi';
	tenantTableBodyRows?: any;
	tenantColumns?: any;
	leaseTableBodyRows?: any;
	maintenanceTableColumns?: any;
	maintenanceTableBodyRows?: any;
	documentTableColumns?: any;
	documentTableBodyRows?: any;
};

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];

const allTabs = ['Overview', 'Lease', 'Maintenance', 'Document'];
const totalMaintenanceRequests = 3;

export const PropertyUnitComponent: FC<PropertyUnitComponentType> = ({
	handleHomeClick,
	currentProperty,
	tenantTableBodyRows,
	propertyType,
	handleTabChange,
	handleNavigation,
	handleMaintenanceTabChange,
	tenantColumns,
	leaseTableBodyRows,
	maintenanceTableBodyRows,
	maintenanceTableColumns,
	documentTableBodyRows,
	documentTableColumns,
}) => {
	const [tabValue, setTabValue] = useState<number>(0);
	const [maintenanceTabValue, setMaintenanceTabValue] = useState<number>(0);

	const propertyAddress = `${currentProperty?.address?.addressLine1} ${currentProperty?.address?.addressLine2 || ''}, ${currentProperty?.address?.city}, ${currentProperty?.address?.state}`;

	const maintenanceTabs = [
		`Active Request (${totalMaintenanceRequests})`,
		'All Requests',
	];

	const unitInfoData = [
		{
			label: 'UNIT',
			value: currentProperty?.unitCount || 0,
			imgSrc: HouseIcon,
		},
		{
			label: 'VACANT UNIT',
			value: currentProperty?.vacantUnitCount || 0,
			valueColor: 'green',
			imgSrc: VacantHomeIcon,
		},
		{
			label: 'TENANT',
			value: currentProperty?.totalTenants || 0,
			imgSrc: TenantIcon,
		},
	];

	return (
		<Container maxWidth={'xl'} sx={styles.container}>
			<Grid>
				<Grid>
					<Breadcrumbs
						separator={
							<ArrowForwardIosIcon
								sx={{
									...styles.iconStyle,
									...styles.arrowIconStyle,
								}}
							/>
						}
						aria-label='breadcrumb'
						sx={styles.breadCrumbStyle}
					>
						<SvgIcon
							sx={styles.iconStyle}
							component={HomeIcon}
							inheritViewBox
							onClick={handleHomeClick}
						/>
						<Typography fontWeight={700} sx={styles.textStyle}>
							{currentProperty?.name}
						</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid sx={styles.actionButtonContainerStyle}>
					<Button variant='propertyButton' sx={styles.actionButtonStyle}>
						<Typography fontWeight={500}>Action</Typography>
						<MoreVertIcon />
					</Button>
				</Grid>
				<Chip
					// sx={styles.chipStyle}
					label={currentProperty?.purpose?.displayText || 'For sale'}
					variant={
						currentProperty?.purpose?.name?.toLowerCase() === 'rent'
							? 'rent'
							: 'sale'
					}
				/>
				<Grid sx={styles.firstCardContainer}>
					<UnitCard
						propertyImage={propertyImage}
						propertyName={currentProperty?.name || ''}
						propertyAddress={propertyAddress}
						propertyId={currentProperty?.id}
						numberOfUnits={currentProperty?.isMultiUnit ? 'Multi' : 'Single'}
						rent={`₦ ${currentProperty?.totalRent}`}
						totalArea={`${currentProperty?.area?.value || 'NA'} ${currentProperty?.area?.unit || ''}`}
						buildingType={currentProperty?.type?.name}
						additionalImages={stackedImages}
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
					<Grid>
						<Grid sx={styles.unitInfoCardStyle}>
							<UnitInfoCard data={unitInfoData} />
						</Grid>

						<Overview initialText={currentProperty?.description} />

						<h1>TODO: Complete highlights component</h1>

						{/* Single unit table and add cards */}

						{
							<Grid sx={styles.addfieldStyle}>
								{tabValue !== 1 && (
									<>
										{tenantTableBodyRows.length > 0 && (
											<TenantAndLeaseTable
												title='Tenant'
												buttonText='Add Tenant'
												handleAdd={handleNavigation}
												columns={tenantColumns}
												tableBodyRows={tenantTableBodyRows}
											/>
										)}

										{!tenantTableBodyRows?.length && (
											<AddFieldCard
												heading={'Add Tenant'}
												subtext={'Add tenants to your property'}
												description={'Add Tenant'}
												handleAdd={handleNavigation}
											/>
										)}
									</>
								)}

								{!leaseTableBodyRows?.length && (
									<AddFieldCard
										heading={'Add Lease'}
										subtext={'Add lease to your property'}
										description={'Add Lease'}
										handleAdd={handleNavigation}
									/>
								)}
							</Grid>
						}
					</Grid>
				)}

				{/* Multi unit */}

				{propertyType === 'Multi' && (
					<Grid>
						<Grid sx={styles.unitInfoCardStyle}>
							<UnitInfoCard data={unitInfoData} />
						</Grid>

						<Overview initialText={currentProperty?.description} />

						<Grid sx={styles.addfieldStyle}>
							{currentProperty?.units?.length > 0 && (
								<UnitsTable
									title='Units'
									handleAdd={handleNavigation}
									buttonText='Add Unit'
									tableBodyRows={currentProperty?.units}
								/>
							)}
							{currentProperty?.units?.length > 0 ? null : (
								<AddFieldCard
									heading={'Add Unit'}
									subtext={'Add units to this property'}
									description={'Add Unit'}
									handleAdd={handleNavigation}
								/>
							)}
						</Grid>
					</Grid>
				)}

				{/* MAINTENANCE TAB */}

				{tabValue === 2 && (
					<Grid
						sx={{
							marginTop: '20px',
							...styles.tenantTableContainer,
							padding: '10px',
						}}
					>
						<TableContainer>
							<Table stickyHeader aria-label='sticky table'>
								<TableHead>
									<TableRow>
										<TableCell
											align='left'
											colSpan={4}
											sx={{ ...styles.tableCell }}
										>
											<TabsComponent
												handleTabChange={handleMaintenanceTabChange}
												tabValue={maintenanceTabValue}
												allTabs={maintenanceTabs}
											/>
										</TableCell>
										<TableCell align='right' colSpan={3} sx={styles.tableCell}>
											<Grid
												item
												xs={6}
												sm={6}
												md={9}
												lg={9}
												sx={styles.addMaintenance}
											>
												<img src={addMaintenance} alt='add maintenance image' />
												<Typography
													onClick={() =>
														handleNavigation && handleNavigation('')
													}
													sx={styles.addMaintenanceText}
												>
													Create Request
												</Typography>
											</Grid>
										</TableCell>
									</TableRow>

									<TableRow>
										{maintenanceTableColumns.map((column: any) => (
											<TableCell
												key={column.label}
												align={'center'}
												sx={styles.tableHeaderCellStyle}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>

								<TableBody>
									{maintenanceTabValue === 0 &&
										maintenanceTableBodyRows.length > 0 &&
										maintenanceTableBodyRows.map((row: any) => {
											return (
												<TableRow
													hover
													role='checkbox'
													tabIndex={-1}
													key={row.id}
												>
													{maintenanceTableColumns.map((column: any) => {
														const key: string = column.id;
														const value = row[key];

														return (
															<TableCell
																key={column.id}
																align={'center'}
																sx={styles.tableBodyStyle}
															>
																{typeof value === 'string' ? (
																	value
																) : (
																	<span style={styles.tenantInfoStyle}>
																		<img
																			src={value.image}
																			alt='tenant picture'
																		/>{' '}
																		{value.name}
																	</span>
																)}
															</TableCell>
														);
													})}
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
							{maintenanceTableBodyRows.length === 0 && (
								<Grid item sx={styles.emptyDataInfo}>
									<Typography sx={styles.emptyDataText} fontWeight={500}>
										No Results Found
									</Typography>

									<Button
										sx={styles.createMaintenceButton}
										onClick={() => handleNavigation && handleNavigation('')}
									>
										<MaintenanceIcon height={20} />

										<Typography variant='h6'>
											Create Maintenance Request
										</Typography>
									</Button>
								</Grid>
							)}
						</TableContainer>
					</Grid>
				)}

				{/* DOCUMENT TAB */}

				{tabValue === 3 && (
					<TableContainer>
						{documentTableBodyRows.length > 0 ? (
							<Table stickyHeader aria-label='sticky table'>
								<TableHead>
									<TableRow>
										{documentTableColumns.map((column: any) => (
											<TableCell
												key={column.label}
												align={'center'}
												sx={styles.tableHeaderCellStyle}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>

								<TableBody>
									{documentTableBodyRows.map((row: any) => {
										return (
											<TableRow
												hover
												role='checkbox'
												tabIndex={-1}
												key={row.id}
											>
												{documentTableColumns.map((column: any) => {
													const key: string = column.id;
													const value = row[key];

													return (
														<TableCell
															key={column.id}
															align={'center'}
															sx={styles.tableBodyStyle}
														>
															{typeof value === 'string' ? (
																value
															) : (
																<span style={styles.tenantInfoStyle}>
																	<img src={value.image} alt='tenant picture' />{' '}
																	{value.name}
																</span>
															)}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						) : (
							<Grid sx={{ marginTop: '20px' }}>
								<Grid sx={styles.uploadDocumentContainer}>
									<Grid item sx={styles.documentTitleContainer}>
										<Typography fontWeight={600} variant='h6'>
											Property Documents
										</Typography>

										<Typography fontSize={16}>
											Keep track of all documents related to this property in
											one place.
										</Typography>
									</Grid>

									<Grid sx={styles.uploadDocumentText}>
										<CloudUploadOutlinedIcon />
										<Typography
											onClick={() => handleNavigation && handleNavigation('')}
											sx={styles.addDocumentText}
										>
											Upload Document
										</Typography>
									</Grid>
								</Grid>

								<Grid item xs={12} sm={12} md={12} lg={12}>
									<Box sx={styles.documentBoxContainer}>
										<Box
											component='label'
											htmlFor='upload-photo'
											display='flex'
											alignItems='center'
											width='250px'
											height='170px'
											sx={styles.documentBox}
										>
											<Box>
												<CloudUploadOutlinedIcon
													sx={styles.documentUploadIcon}
												/>
											</Box>
											<input
												type='file'
												id='upload-photo'
												style={{ display: 'none' }}
												multiple
												accept='image/png, image/jpeg'
												onChange={() =>
													handleNavigation && handleNavigation('')
												}
											/>
										</Box>
									</Box>

									<Grid sx={styles.noDocumentsStyle}>
										<Typography sx={styles.documentText} fontWeight={600}>
											No Documents Found
										</Typography>

										<Typography sx={styles.documentSubText}>
											Upload or drag document here
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						)}
					</TableContainer>
				)}
			</Grid>
		</Container>
	);
};
