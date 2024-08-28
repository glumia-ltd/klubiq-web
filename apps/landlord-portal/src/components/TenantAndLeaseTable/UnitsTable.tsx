import {
	Button,
	Card,
	Grid,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { styles } from './style';
import { FC } from 'react';
import { Bedroom, Bathroom, FloorPlan } from '../Icons/CustomIcons';
import bukky from '../../assets/images/bukky.png';
import { UnitType } from '../../shared/type';

type UnitsTableType = {
	title: string;
	handleAdd?: (path?: string) => void;
	buttonText: string;
	// tableBodyRows: UnitsTableRowType[];
	tableBodyRows: any;
};

type LeaseType = {
	id: number;
	name: string;
	paymentFrequency: string;
	status: string;
	rentAmount: string;
	startDate: string;
	endDate: string;
	rentDueDay: number;
	securityDeposit: string;
	tenants: [];
	isDraft: boolean;
	isArchived: boolean;
};

export const UnitsTable: FC<UnitsTableType> = ({
	handleAdd,
	buttonText,
	tableBodyRows,
	title,
}) => {
	const handleButtonClick = () => {
		handleAdd && handleAdd('');
	};
	return (
		<Card sx={styles.tenantTableContainer}>
			<TableContainer>
				<Table aria-label='sticky table'>
					<TableHead>
						<TableRow>
							<TableCell align='left' colSpan={2} sx={{ ...styles.tableCell }}>
								{title}
							</TableCell>
							<TableCell align='right' colSpan={3} sx={styles.tableCell}>
								<Grid item xs={6} sm={6} md={9} lg={9}>
									<Button
										variant='propertyButton'
										onClick={handleButtonClick}
										sx={styles.tableButton}
									>
										{buttonText}
									</Button>
								</Grid>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableBodyRows?.map((row: UnitType) => (
							<TableRow
								hover
								role='checkbox'
								tabIndex={-1}
								key={row.id}
								sx={{
									cursor: 'pointer',
									borderBottom: '1px solid primary.main',
								}}
							>
								<TableCell align={'left'} sx={styles.tableBodyStyle}>
									Unit {row?.unitNumber}
								</TableCell>
								<TableCell align={'center'} sx={styles.tableBodyStyle}>
									<span style={styles.tenantInfoStyle}>
										<img src={bukky} alt='tenant picture' />{' '}
										{'No tenant added yet'}
									</span>
								</TableCell>
								<TableCell align={'center'} sx={styles.tableBodyStyle}>
									<Stack direction={'row'} alignItems={'center'}>
										<FloorPlan />
										<Typography>
											{row?.area?.value} {row?.area?.unit}
										</Typography>
									</Stack>
								</TableCell>
								<TableCell sx={styles.tableBodyStyle}>
									<Stack direction={'row'} spacing={2}>
										<>
											<Bedroom />
											{row?.bedrooms}
										</>
										<>
											<Bathroom />
											{row?.bathrooms}
										</>
									</Stack>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
};
