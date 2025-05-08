import {
	Avatar,
	AvatarGroup,
	Button,
	Grid,
	Popover,
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
import aisha from '../../assets/images/aisha.jpg';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { getLocaleFormat } from '../../helpers/utils';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { TenantType } from '../../shared/type';
import { SimpleTableColumn } from '../../page-tytpes/properties/detail-page.types';
type RowType = {
	id: string | number;
	tenants?: TenantType[];
	status?: string;
	rentAmount?: string;
	startDate?: string;
	endDate?: string;
};

type TenantAndLeaseTableProps = {
	handleAdd?: (path: string) => void;
	title: string;
	buttonText: string;
	columns: SimpleTableColumn[];
	tableBodyRows: RowType[];
	showSecondHeader?: boolean;
};

export const TenantAndLeaseTable: FC<TenantAndLeaseTableProps> = ({
	title,
	handleAdd,
	buttonText,
	columns,
	tableBodyRows,
	showSecondHeader = true,
}) => {
	const path = title === 'Tenant' ? 'add-tenant' : 'add-lease';
	const { user } = useSelector(getAuthState);
	const handleClick = () => {
		handleAdd && handleAdd(path);
	};

	return (
		<Grid sx={styles.tenantTableContainer}>
			<TableContainer>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							<TableCell align='left' colSpan={2} sx={{ ...styles.tableCell }}>
								{title}
							</TableCell>
							<TableCell align='right' colSpan={3} sx={styles.tableCell}>
								<Grid item xs={6} sm={6} md={9} lg={9}>
									<Button
										variant='propertyButton'
										onClick={handleClick}
										sx={styles.tableButton}
									>
										{buttonText}
									</Button>
								</Grid>
							</TableCell>
						</TableRow>
						{showSecondHeader && (
							<TableRow>
								{columns?.map((column) => (
									<TableCell
										key={column?.label}
										align={'center'}
										sx={styles.tableHeaderCellStyle}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						)}
					</TableHead>
					<TableBody>
						{tableBodyRows?.map((row) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
									<TableCell align={'center'} sx={styles.tableBodyStyle}>
										{row?.tenants && row?.tenants?.length > 1 && (
											<PopupState variant='popover'>
												{(popupState) => {
													return (
														<div style={{ cursor: 'pointer' }}>
															<AvatarGroup
																max={4}
																sx={{ justifyContent: 'center' }}
																{...bindTrigger(popupState)}
															>
																<Avatar alt='Remy Sharp' src={aisha} />
																<Avatar alt='Travis Howard' src={aisha} />
																<Avatar alt='Cindy Baker' src={aisha} />
																<Avatar alt='Agnes Walker' src={aisha} />
																<Avatar alt='Trevor Henderson' src={aisha} />
															</AvatarGroup>
															<Popover
																{...bindPopover(popupState)}
																anchorOrigin={{
																	vertical: 'bottom',
																	horizontal: 'center',
																}}
																transformOrigin={{
																	vertical: 'top',
																	horizontal: 'center',
																}}
															>
																<Typography sx={{ p: 2 }}>
																	{row?.tenants?.map(
																		(tenant) =>
																			`${tenant?.profile?.firstName} ${tenant?.profile?.lastName}`,
																	).join(', ')}
																</Typography>
															</Popover>
														</div>
													);
												}}
											</PopupState>
										)}

										{row?.tenants && row?.tenants?.length === 1 && (
											<>
												<Avatar
													alt={row.tenants[0]?.profile?.firstName}
													src={row.tenants[0]?.profile?.profilePicUrl ?? ''}
												/>
												<Typography sx={{ p: 2 }}>
													{row?.tenants[0]?.profile?.firstName}{' '}
													{row?.tenants[0]?.profile?.lastName}
												</Typography>
											</>
										)}
									</TableCell>
									<TableCell align={'center'} sx={styles.tableBodyStyle}>
										{row?.status}
									</TableCell>
									<TableCell align={'center'} sx={styles.tableBodyStyle}>
									{`${getLocaleFormat(user?.orgSettings, +(row?.rentAmount ?? 0), 'currency')}`}
									
									</TableCell>
									<TableCell align={'center'} sx={styles.tableBodyStyle}>
										{row.startDate}
									</TableCell>
									<TableCell align={'center'} sx={styles.tableBodyStyle}>
										{row.endDate}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};
