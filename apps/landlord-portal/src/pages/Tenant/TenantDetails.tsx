import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Stack, Card, Box, IconButton } from '@mui/material';
import fileIcon from '../../assets/images/Vector (2).svg';
import { useTenantActions } from '../../hooks/page-hooks/tenant-hooks';
import { DynamicTable } from '@klubiq/ui-components';
import bukky from '../../assets/images/bukky.png';
import HistoryTable from '../Lease/HistoryTable';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import * as KlubiqIcons from '../../components/Icons/CustomIcons';
import { styles } from './styles';

import { LeaseDetail, TenantInfo } from '../../shared/type';
import {
	TenantType,
	TenantDocumentRow,
	TenantLocationState,
} from '../../shared/type'; // Adjust path

const TenantDetails = () => {
	const { tableSx, tableStyles } = useTenantActions();

	const location = useLocation();
	const { selectedRow: locationRow } =
		(location.state as TenantLocationState) || {};

	const [selectedRow, setSelectedRow] = useState<TenantType | null>(
		locationRow || null,
	);

	useEffect(() => {
		if (location.state && (location.state as TenantLocationState).selectedRow) {
			setSelectedRow((location.state as TenantLocationState).selectedRow);
		}
	}, [location.state]);

	console.log('Selected Row:', selectedRow);
	const tenant: TenantInfo = {
		name: `${selectedRow?.profile?.firstName ?? ''} ${selectedRow?.profile?.lastName ?? ''}`,
		phone: selectedRow?.profile?.phoneNumber ?? 'N/A',
		email: selectedRow?.profile?.email ?? 'N/A',
		since: selectedRow?.leaseDetails?.startDate ?? 'N/A',
		image: selectedRow?.profile?.profilePicUrl || bukky,
	};

	const leaseDetails: LeaseDetail[] = [
		{ name: 'Monthly Rent', amount: '500,000' },
		{ name: 'Start Date', amount: '06/02/2024' },
		{ name: 'End Date', amount: '06/02/2028' },
		{ name: 'Late Payment', amount: '2' },
	];

	const rows: TenantDocumentRow[] = [
		{ name: 'Maintenance fee', dueDate: 'March 13, 2025' },
		{ name: 'Insurance fee', dueDate: 'April 4, 2024' },
		{ name: 'Landmark House unit 1 Lease payment', dueDate: 'March 13, 2025' },
		{ name: 'Landmark House unit 2 Lease payment', dueDate: 'April 4, 2024' },
	];

	const columns = [
		{
			key: 'name',
			label: 'Name',
			render: (name: { name: string }) => (
				<Box sx={styles.tableDiv} display='flex' alignItems='center'>
					<img src={fileIcon} alt='file icon' />
					<Typography sx={styles.cellText} ml='25px'>
						{name.name}
					</Typography>
				</Box>
			),
		},
		{ key: 'dueDate', label: 'Due Date' },
	];
	return (
		<Stack spacing={4}>
			<Stack direction='row' spacing={1} sx={styles.detailsCard}>
				<Card sx={styles.detailsCard}>
					<Stack
						direction='row'
						spacing={0}
						justifyContent='space-between'
						alignItems='center'
					>
						<Stack direction='row' spacing={3}>
							<img src={tenant.image} alt='tenant' style={styles.imageStyle} />
							<Stack direction='column' spacing={5}>
								<Stack direction='row' spacing={3} sx={styles.firstBox}>
									<Typography sx={styles.nameText}>{tenant.name}</Typography>
									<IconButton>
										<KlubiqIcons.EditIcon sx={styles.iconStyleTwo} />
										<Typography sx={styles.boxText}>Edit</Typography>
									</IconButton>
								</Stack>
								<Stack direction='row' spacing={2}>
									<Box sx={styles.tenBox}>
										<MailOutlinedIcon sx={styles.iconStyleTwo} />
										<Typography sx={styles.boxText}>{tenant.phone}</Typography>
									</Box>
									<Box sx={styles.tenBox}>
										<MailOutlinedIcon sx={styles.iconStyleTwo} />
										<Typography sx={styles.boxText}>{tenant.email}</Typography>
									</Box>
								</Stack>
							</Stack>
						</Stack>
						<Stack direction='column' spacing={1}>
							<Typography sx={styles.detailsText}>Tenant Since</Typography>
							<Typography sx={styles.boxText}>{tenant.since}</Typography>
						</Stack>
					</Stack>
				</Card>
			</Stack>
			<Stack direction='row' sx={styles.detailsCard}>
				<Card sx={styles.detailsCard}>
					<Stack direction='column' spacing={3}>
						<Stack direction='column' spacing={1}>
							<Stack direction='row' spacing={2} sx={styles.firstBox}>
								<Typography sx={styles.nameText2}>Current Lease</Typography>
								<Typography sx={styles.cardTwoText}>
									Orchid House | Unit O
								</Typography>
							</Stack>
							<Typography sx={styles.typo3}>
								4, Shaw Road (Onilegbale Road) Ikoyi
							</Typography>
						</Stack>
						<Box display='flex' justifyContent='space-between'>
							{leaseDetails.map((item, index) => (
								<Box key={index}>
									<Typography sx={styles.typo2}>{item.name}</Typography>
									<Typography sx={styles.nameText}>{item.amount}</Typography>
								</Box>
							))}
						</Box>
					</Stack>
				</Card>
			</Stack>
			<Stack spacing={1} sx={styles.detailsCard}>
				<HistoryTable />
			</Stack>
			<Stack spacing={1} sx={styles.detailsCard}>
				<DynamicTable
					header='Tenant Documents'
					subHeader='Keep track of all documents related to this property in one place.'
					columns={columns}
					rows={rows}
					styles={tableStyles}
					colors={tableSx}
				/>
			</Stack>
		</Stack>
	);
};

export default TenantDetails;
