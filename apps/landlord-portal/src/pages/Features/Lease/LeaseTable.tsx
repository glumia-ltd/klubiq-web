import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Chip,
	Typography,
	Box,
} from '@mui/material';

import { styles } from './style';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { GroupedAvatar } from '../../../components/GroupedAvatar/GroupedAvatar';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import { getLocaleDateFormat, DateStyle } from '../../../helpers/utils';
import { LeaseType } from '../../../shared/type';

type LeaseTableType = {
	title: string;
	handleAdd?: (path?: string) => void;
	filters?: Record<string, string | number>;
	onRowClick?: (lease: any) => void;
	allLease: LeaseType[];
};

export const LeaseTable: FC<LeaseTableType> = ({ onRowClick, allLease }) => {
	const { user } = useSelector(getAuthState);
	const timeDateOptions = {
		dateStyle: DateStyle.MEDIUM,
		hour12: true,
	};
	const statusColors: Record<string, string> = {
		Active: 'success',
		Expiring: 'warning',
		'Over Due': 'error',
	};

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
					{allLease?.map((lease: any, index: number) => (
						<TableRow
							key={index}
							hover
							onClick={() => onRowClick && onRowClick(lease.id)}
							sx={{ cursor: 'pointer' }}
						>
							<TableCell align='center'>
								<Chip
									label={lease.status}
									color={statusColors[lease.status] as any}
									variant='outlined'
									sx={styles.chip}
								/>
							</TableCell>
							<TableCell sx={{}} align='left'>
								<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
									{lease.tenants.length > 0 ? (
										<GroupedAvatar tenants={lease.tenants} />
									) : (
										<NavLink to='/add-tenant'>Add Tenant</NavLink>
									)}
									{ lease.tenants.length === 1 &&(
										<Typography fontWeight='600' ml='15px'>
										{lease?.tenants[0]?.profile?.firstName} {lease?.tenants[0]?.profile?.lastName}
									</Typography>
									)}
								</Box>
							</TableCell>
							<TableCell align='center'>{lease?.property?.name}</TableCell>
							<TableCell align='center'>{lease?.unitNumber}</TableCell>
							<TableCell align='center'>{getLocaleDateFormat(user?.orgSettings, lease?.startDate, timeDateOptions)}</TableCell>
							<TableCell align='center'>{getLocaleDateFormat(user?.orgSettings, lease?.endDate, timeDateOptions)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
