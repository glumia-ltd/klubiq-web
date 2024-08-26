import {
	Box,
	Breadcrumbs,
	Button,
	Chip,
	Container,
	Grid,
	SvgIcon,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import {
	HouseIcon,
	VacantHomeIcon,
	TenantIcon,
	HomeMaintenanceIcon,
} from '../../components/Icons/CustomIcons';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UnitInfoCard from '../../components/UnitInfoComponent/UnitInfoCard';
import AddFieldCard from '../../components/AddFieldsComponent/AddFieldCard';
import { UnitCard } from '../../components/UnitCard/UnitCard';
import { TabsComponent } from '../../components/TabsComponent/TabsComponent';
import { Overview } from '../../components/Overview/Overview';
import { TenantAndLeaseTable } from '../../components/TenantAndLeaseTable/TenantAndLeaseTable';
import propertyImage from '../../assets/images/propertyImage.png';
import addMaintenance from '../../assets/images/addMaintenance.svg';
import { styles } from './style';
import { useState } from 'react';
import { MaintenanceIcon } from '../../components/Icons/MaintenanceIcon';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useNavigate, useLocation } from 'react-router-dom';

import aisha from '../../assets/images/aisha.jpg';
import bukky from '../../assets/images/bukky.png';

import { useGetSinglePropertyByUUIDQuery } from '../../store/PropertyPageStore/propertyApiSlice';

import { UnitsTable } from '../../components/TenantAndLeaseTable/UnitsTable';

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];
const allTabs = ['Overview', 'Lease', 'Maintenance', 'Document'];

type ColumnType = { id: string; label: string };
type RowType = {
	id: string;
	tenant: { name: string; image: string };
	phone: string;
	email: string;
	startDate: string;
	cutOffDate: string;
};

const columns: ColumnType[] = [
	{ id: 'tenant', label: 'Tenant' },
	{ id: 'phone', label: 'Phone' },
	{ id: 'email', label: 'Email' },
	{ id: 'startDate', label: 'Start Date' },
	{ id: 'cutOffDate', label: 'Cut-off date' },
];
const tableBodyRows: RowType[] = [
	{
		id: 'fadfasdfasd',
		tenant: { name: 'Aisha Rohni', image: aisha },
		phone: '0701234567',
		email: 'aishar@yahoo.com',
		startDate: 'April 4, 2024',
		cutOffDate: 'May 4, 2024',
	},
	{
		id: 'fadfasdfaadvadvd',
		tenant: { name: 'Bukky King', image: bukky },
		phone: '0805277558',
		email: 'bking@gmail.com',
		startDate: 'July 29, 2023',
		cutOffDate: 'July 29, 2025',
	},
];

const totalMaintenanceRequests = 3;

const PropertyPage = () => {
	const [tabValue, setTabValue] = useState<number>(0);
	const [maintenanceTabValue, setMaintenanceTabValue] = useState<number>(0);

	const navigate = useNavigate();
	const location = useLocation();

	const currentUUId = location.pathname.split('/')[2]!;

	const { data: currentProperty, isLoading: isCurrentPropertyLoading } =
		useGetSinglePropertyByUUIDQuery({
			uuid: currentUUId || '',
		});

	console.log(currentProperty);

	const propertyType = currentProperty?.isMultiUnit ? 'Multi' : 'Single';

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
			value: 0,
			imgSrc: TenantIcon,
		},
		{
			label: 'MAINTENANCE REQUEST',
			value: 0,
			valueColor: 'red',
			imgSrc: HomeMaintenanceIcon,
		},
	];

	const handleTabChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setTabValue(newValue);
	};

	const handleAddTenantCard = () => {
		navigate('/properties/12345/add-tenant');
	};

	const handleAddLeaseCard = () => {
		navigate('/properties/12345/add-lease');
	};

	const handleCreateMaintenance = () => {
		navigate('/properties/12345/add-maintenance');
	};

	const handleCreateDocument = () => {};

	const handleMaintenanceTabChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setMaintenanceTabValue(newValue);
	};

	const handleHomeClick = () => {
		navigate('/properties');
	};

	const handleFileChange = () => {};

	const handleAddUnit = () => {};

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

						{
							<Grid sx={styles.addfieldStyle}>
								{tabValue !== 1 && (
									<>
										{tableBodyRows.length > 0 && (
											<TenantAndLeaseTable
												title='Tenant'
												buttonText='Add Tenant'
												handleAdd={handleAddTenantCard}
												columns={columns}
												tableBodyRows={tableBodyRows}
											/>
										)}

										{!tableBodyRows?.length && (
											<AddFieldCard
												heading={'Add Tenant'}
												subtext={'Add tenants to your property'}
												description={'Add Tenant'}
												onClick={handleAddTenantCard}
											/>
										)}
									</>
								)}

								{!tableBodyRows?.length && (
									<AddFieldCard
										heading={'Add Lease'}
										subtext={'Add lease to your property'}
										description={'Add Lease'}
										onClick={handleAddLeaseCard}
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
							{tableBodyRows.length > 0 && (
								<UnitsTable
									title='Units'
									handleAdd={handleAddTenantCard}
									buttonText='Add Unit'
									tableBodyRows={currentProperty?.units}
								/>
							)}
							<AddFieldCard
								heading={'Add Unit'}
								subtext={'Add units to this property'}
								description={'Add Unit'}
								onClick={handleAddUnit}
							/>
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
													onClick={handleCreateMaintenance}
													sx={styles.addMaintenanceText}
												>
													Create Request
												</Typography>
											</Grid>
										</TableCell>
									</TableRow>

									<TableRow>
										{columns.map((column) => (
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
										tableBodyRows.length > 0 &&
										tableBodyRows.map((row) => {
											return (
												<TableRow
													hover
													role='checkbox'
													tabIndex={-1}
													key={row.id}
												>
													{columns.map((column) => {
														const key: string = column.id;
														const value = row[key as keyof RowType];

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
							{tableBodyRows.length === 0 && (
								<Grid item sx={styles.emptyDataInfo}>
									<Typography sx={styles.emptyDataText} fontWeight={500}>
										No Results Found
									</Typography>

									<Button
										sx={styles.createMaintenceButton}
										onClick={handleCreateMaintenance}
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
						{tableBodyRows.length > 0 ? (
							<Table stickyHeader aria-label='sticky table'>
								<TableHead>
									<TableRow>
										{columns.map((column) => (
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
									{tableBodyRows.map((row) => {
										return (
											<TableRow
												hover
												role='checkbox'
												tabIndex={-1}
												key={row.id}
											>
												{columns.map((column) => {
													const key: string = column.id;
													const value = row[key as keyof RowType];

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
											onClick={handleCreateDocument}
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
												onChange={handleFileChange}
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

export default PropertyPage;
