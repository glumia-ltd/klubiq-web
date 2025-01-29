import {
	Card,
	Grid,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Skeleton,
} from '@mui/material';
import { styles } from './style';
import { FC } from 'react';
import { Bedroom, Bathroom, FloorPlan } from '../Icons/CustomIcons';
import { UnitType } from '../../shared/type';
import { useNavigate } from 'react-router-dom';

type UnitsTableType = {
	handleAdd?: (path?: string) => void;
	// tableBodyRows: UnitsTableRowType[];
	tableBodyRows: any;
};

// type LeaseType = {
// 	id: number;
// 	name: string;
// 	paymentFrequency: string;
// 	status: string;
// 	rentAmount: string;
// 	startDate: string;
// 	endDate: string;
// 	rentDueDay: number;
// 	securityDeposit: string;
// 	tenants: [];
// 	isDraft: boolean;
// 	isArchived: boolean;
// };

const TableSkeleton: FC<UnitsTableType> = ({ tableBodyRows }) => {
	const navigate = useNavigate();

	const handleUnitClick = (id: string | number) => {
		navigate(`unit/${id}`);
	};

	return (
		<Card sx={styles.tenantTableContainer}>
			<TableContainer>
				<Table aria-label='sticky table'>
					<TableHead>
						<TableRow>
							<TableCell align='left' colSpan={2} sx={{ ...styles.tableCell }}>
								<Skeleton
									variant='rectangular'
									width={'80px'}
									height={'20px'}
								/>
							</TableCell>
							<TableCell align='right' colSpan={3} sx={styles.tableCell}>
								<Grid item xs={6} sm={6} md={9} lg={9}>
									<Skeleton variant='rounded' sx={styles.tableButton} />
								</Grid>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableBodyRows?.map((row: UnitType) => (
							<TableRow
								hover
								onClick={() => row?.id !== undefined && handleUnitClick(row.id)}
								tabIndex={-1}
								key={row.id}
								sx={{
									cursor: 'pointer',
									borderBottom: '1px solid primary.main',
								}}
							>
								<TableCell align={'left'} sx={styles.tableBodyStyle}>
									<Skeleton
										variant='rectangular'
										width={'80px'}
										height={'20px'}
									/>
								</TableCell>
								<TableCell align={'center'} sx={styles.tableBodyStyle}>
									<span style={styles.tenantInfoStyle}>
										<Skeleton
											variant='circular'
											style={styles.tenantInfoStyle}
										/>{' '}
										<Skeleton variant='text' width='125px' />
									</span>
								</TableCell>
								<TableCell align={'center'} sx={styles.tableBodyStyle}>
									<Stack direction={'row'} alignItems={'center'}>
										<FloorPlan />
										<Skeleton variant='text' width='5px' />
									</Stack>
								</TableCell>
								<TableCell sx={styles.tableBodyStyle}>
									<Stack direction={'row'} spacing={2}>
										<>
											<Bedroom />
											<Skeleton variant='text' width='5px' />
										</>
										<>
											<Bathroom />
											<Skeleton variant='text' width='5px' />
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

export default TableSkeleton;
