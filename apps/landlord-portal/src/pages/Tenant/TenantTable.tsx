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
    Avatar,
} from '@mui/material';

import { styles } from './styles';
import { FC } from 'react';
// import { NavLink } from 'react-router-dom';
// import { GroupedAvatar } from '../../components/GroupedAvatar/GroupedAvatar';
// import { useSelector } from 'react-redux';
// import { getAuthState } from '../../store/AuthStore/AuthSlice';
// import { getLocaleDateFormat, DateStyle } from '../../helpers/utils';
import { TenantType } from '../../shared/type';

type TenantTableType = {
	title: string;
	filters?: Record<string, string | number>;
	onRowClick?: (tenant: any) => void;
	allTenant: TenantType[];
};

export const TenantTable: FC<TenantTableType> = ({ onRowClick, allTenant }) => {
	// const { orgSettings } = useSelector(getAuthState);
	// const timeDateOptions = {
	// 	dateStyle: DateStyle.MEDIUM,
	// 	hour12: true,
	// };
	const statusColors: Record<string, string> = {
		Paid: 'success',
		Pending: 'warning',
		Overdue: 'error',
	};

	return (
		<TableContainer component={Card}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align='left' colSpan={8} sx={{ ...styles.tableCell }}>
							Tenant
						</TableCell>
					</TableRow>
				</TableHead>
				<TableHead sx={styles.tableHeaderCellStyle}>
					<TableRow>
						<TableCell align='center' sx={styles.headerText}>
							Name
						</TableCell>
						<TableCell align='center' sx={styles.headerText}>
							Property
						</TableCell>
						<TableCell align='center' sx={styles.headerText}>
							Unit
						</TableCell>
						<TableCell align='center' sx={styles.headerText}>
							Address
						</TableCell>
						<TableCell align='center' sx={styles.headerText}>
							Status
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{allTenant?.map((tenant: any, index: number) => (
						<TableRow
							key={index}
							hover
							onClick={() => onRowClick && onRowClick(tenant.id)}
							sx={{ cursor: 'pointer' }}
						>
							<TableCell sx={{}} align='center'>
								<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    {tenant?.profile?.profilePicUrl ? (
                                        <Avatar src={tenant?.profile?.profilePicUrl} alt={`${tenant?.profile?.firstName}${tenant?.profile?.lastName}`} />
                                    ) : (
                                        <Avatar>
                                            {tenant?.profile?.firstName?.charAt(0)}{tenant?.profile?.lastName?.charAt(0)}
                                        </Avatar>
                                    )}
                                    <Typography fontWeight='600' ml='15px'>
										{tenant?.profile?.firstName} {tenant?.profile?.lastName}
									</Typography>
								</Box>
							</TableCell>
							<TableCell align='center'>{tenant?.propertyDetails?.name}</TableCell>
							<TableCell align='center'>{tenant?.propertyDetails?.unitNumber}</TableCell>
							<TableCell align='center'>{tenant?.propertyDetails?.address?.addressLine1}</TableCell>
							<TableCell align='center'>{tenant?.propertyDetails?.address?.addressLine2}</TableCell>
                            <TableCell align='center'>
								<Chip
									label={tenant?.leaseDetails?.status}
									color={statusColors[tenant?.leaseDetails?.status] as any}
									variant='outlined'
									sx={styles.chip}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
