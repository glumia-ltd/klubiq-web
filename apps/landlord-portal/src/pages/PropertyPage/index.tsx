import {
	Breadcrumbs,
	Button,
	Chip,
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
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ViewPort from '../../components/Viewport/ViewPort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UnitInfoCard from '../../components/UnitInfoComponent/UnitInfoCard';
import AddFieldCard from '../../components/AddFieldsComponent/AddFieldCard';
import { UnitCard } from '../../components/UnitCard/UnitCard';
import { TabsComponent } from '../../components/TabsComponent/TabsComponent';
import { Overview } from '../../components/Overview/Overview';
import { TenantAndLeaseTable } from '../../components/TenantAndLeaseTable/TenantAndLeaseTable';
import propertyImage from '../../assets/images/propertyImage.png';
import addMaintenance from '../../assets/images/addMaintenance.svg';
import HouseIcon from '../../assets/images/home.svg';
import IconTwo from '../../assets/images/home2.svg';
import IconThree from '../../assets/images/people.svg';
import IconFour from '../../assets/images/lasthouse.svg';
import { styles } from './style';
import { useState } from 'react';
import aisha from '../../assets/images/aisha.jpg';
import bukky from '../../assets/images/bukky.png';

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];
const allTabs = ['Overview', 'Lease', 'Maintenance', 'Document'];

const initialText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat laboris nisi ut aliquip exea commodo comm Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat laboris nisi ut aliquip ex ea commodo commodo`;

const data = [
	{
		label: 'UNIT',
		value: 1,
		imgSrc: HouseIcon,
	},
	{
		label: 'VACANT UNIT',
		value: 1,
		valueColor: 'green',
		imgSrc: IconTwo,
	},
	{
		label: 'TENANT',
		value: 0,
		imgSrc: IconThree,
	},
	{
		label: 'MAINTENANCE REQUEST',
		value: 0,
		valueColor: 'red',
		imgSrc: IconFour,
	},
];

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

	const maintenanceTabs = [
		'All Requests',
		`Active Request (${totalMaintenanceRequests})`,
	];

	const handleTabChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setTabValue(newValue);
	};

	const handleAddTenant = () => {};

	const handleCreateDocument = () => {};

	const handleMaintenanceTabChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setMaintenanceTabValue(newValue);
	};

	return (
		<ViewPort>
			<Grid sx={styles.container}>
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
						/>
						<Typography fontWeight={700} sx={styles.textStyle}>
							Landmark Estate
						</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid sx={styles.actionButtonContainerStyle}>
					<Button sx={styles.actionButtonStyle}>
						<Typography fontWeight={500}>Action</Typography>
						<MoreVertIcon />
					</Button>
				</Grid>
				<Chip sx={styles.chipStyle} label={'For Rent'} />
				<Grid sx={styles.firstCardContainer}>
					<UnitCard
						propertyImage={propertyImage}
						propertyName='Landmark Estate'
						propertyAddress='Engineering Close,off Idowu Street,  Victoria Island'
						propertyId='123456'
						numberOfUnits='Single'
						rent='₦0.0'
						totalArea='350 sqm'
						buildingType='Duplex'
						additionalImages={stackedImages}
					/>

					<TabsComponent
						handleTabChange={handleTabChange}
						tabValue={tabValue}
						allTabs={allTabs}
					/>
				</Grid>

				{/* OVERVIEW AND LEASE CONTENTS */}
				{(tabValue === 0 || tabValue === 1) && (
					<Grid>
						<Grid sx={styles.unitInfoCardStyle}>
							<UnitInfoCard data={data} />
						</Grid>

						<Overview initialText={initialText} />

						<Grid sx={styles.addfieldStyle}>
							{tabValue !== 1 && (
								<>
									<TenantAndLeaseTable
										title='Tenat'
										buttonText='Add Tenant'
										handleAdd={handleAddTenant}
										columns={columns}
										tableBodyRows={tableBodyRows}
									/>

									<AddFieldCard
										heading={'Add Tenant'}
										subtext={'Add tenants to your property'}
										description={'Add Tenant'}
									/>
								</>
							)}

							<AddFieldCard
								heading={'Add Lease'}
								subtext={'Add lease to your property'}
								description={'Add Lease'}
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
													onClick={handleCreateDocument}
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
						</TableContainer>
					</Grid>
				)}
			</Grid>
		</ViewPort>
	);
};

export default PropertyPage;
