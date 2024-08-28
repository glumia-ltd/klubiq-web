import {
	Grid,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Typography,
	TableBody,
	Button,
} from '@mui/material';
import { FC, useState } from 'react';
import { styles } from '../PropertyUnitComponent/style';
import { MaintenanceIcon } from '../Icons/MaintenanceIcon';
import { TabsComponent } from '../TabsComponent/TabsComponent';
import { useNavigate } from 'react-router-dom';

const totalMaintenanceRequests = 3;

const maintenanceTabs = [
	`Active Request (${totalMaintenanceRequests})`,
	'All Requests',
];

type MaintenanceTableComponentType = {
	maintenanceData: any;
};

export const MaintenanceTableComponent: FC<MaintenanceTableComponentType> = ({
	maintenanceData,
}) => {
	const navigate = useNavigate();
	const [maintenanceTabValue, setMaintenanceTabValue] = useState<number>(0);

	const maintenanceTableColumns = maintenanceData?.columns;
	const maintenanceTableBodyRows = maintenanceData?.rows;

	const handleMaintenanceTabChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setMaintenanceTabValue(newValue);
	};

	const handleNavigation = () => {
		navigate('/add-maintenance');
	};

	return (
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
							<TableCell align='left' colSpan={4} sx={{ ...styles.tableCell }}>
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
									<MaintenanceIcon height={20} />
									{/* <img src={addMaintenance} alt='add maintenance image' /> */}
									<Typography
										onClick={handleNavigation}
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
									<TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
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
				{maintenanceTableBodyRows.length === 0 && (
					<Grid item sx={styles.emptyDataInfo}>
						<Typography sx={styles.emptyDataText} fontWeight={500}>
							No Results Found
						</Typography>

						<Button
							sx={styles.createMaintenceButton}
							onClick={handleNavigation}
						>
							<MaintenanceIcon height={20} />

							<Typography variant='h6'>Create Maintenance Request</Typography>
						</Button>
					</Grid>
				)}
			</TableContainer>
		</Grid>
	);
};
