import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Box,
	Pagination,
	Chip,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { styles } from './style';
import { FC } from 'react';
import bukky from '../../assets/images/bukky.png';
import { leases } from './data';

type LeaseTableType = {
	title: string;
	handleAdd?: (path?: string) => void;
	filters: Record<string, string | number>;
	onRowClick?: (lease: any) => void;
};

export const LeaseTable: FC<LeaseTableType> = ({ filters, onRowClick }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage] = useState(5);

	const statusColors: Record<string, string> = {
		Active: 'success',
		Expiring: 'warning',
		'Over Due': 'error',
	};

	const filteredLeases = leases.filter((lease) => {
		const statusFilter = filters.status
			? lease.status === filters.status
			: true;
		const propertyFilter = filters.property
			? lease.property === filters.property
			: true;

		return statusFilter && propertyFilter;
	});

	const paginatedLeases = filteredLeases.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage,
	);

	return (
		<TableContainer component={Card}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align='left' colSpan={8} sx={{ ...styles.tableCell }}>
							Lease
						</TableCell>
					</TableRow>
				</TableHead>
				<TableHead sx={styles.tableHeaderCellStyle}>
					<TableRow>
						<TableCell align='center' sx={styles.headerText}>
							Status
						</TableCell>
						<TableCell align='center' sx={styles.headerText}>
							Tenant
						</TableCell>
						<TableCell align='center' sx={styles.headerText}>
							Property
						</TableCell>
						<TableCell align='center' sx={styles.headerText}>
							Unit
						</TableCell>
						<TableCell align='center' sx={styles.headerText}>
							Lease Start
						</TableCell>
						<TableCell align='center' sx={styles.headerText}>
							Lease End
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{paginatedLeases.map((lease, index) => (
						<TableRow
							key={index}
							hover // Adds hover effect on rows
							onClick={() => onRowClick && onRowClick(lease)} // Makes row clickable
							sx={{ cursor: 'pointer' }} // Changes the cursor to pointer
						>
							<TableCell align='center'>
								<Chip
									label={lease.status}
									color={statusColors[lease.status] as any}
									variant='outlined'
									sx={styles.chip}
								/>
							</TableCell>
							<TableCell sx={styles.check}>
								<img src={bukky} alt='tenant picture' />
								<Typography fontWeight='600' ml='15px'>
									{lease.tenant}
								</Typography>
							</TableCell>
							<TableCell align='center'>{lease.property}</TableCell>
							<TableCell align='center'>{lease.unit}</TableCell>
							<TableCell align='center'>{lease.leaseStart}</TableCell>
							<TableCell align='center'>{lease.leaseEnd}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Box display='flex' justifyContent='center' mt={2}>
				<Pagination
					count={Math.ceil(filteredLeases.length / rowsPerPage)}
					page={currentPage}
					onChange={(_, value) => setCurrentPage(value)}
					color='primary'
					sx={styles.paginationStyle}
				/>
			</Box>
		</TableContainer>
	);
};
