import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import bukky from '../../assets/images/bukky.png';
import HistoryTable from '../Lease/HistoryTable';
import TenantDocument from '../Tenant/TenantDocument';
import TenantCard from './TenantCard';
import LeaseDetailsCard from './LeaseDetailsCard';
import { LeaseDetail, TenantInfo } from '../../shared/type';
import { styles } from './styles';
import { TenantType,TenantLocationState } from '../../shared/type'; // Adjust path


const TenantDetails = () => {
	const location = useLocation();
	const { selectedRow: locationRow } =
	  (location.state as TenantLocationState) || {};
  
	
  
	const [selectedRow, setSelectedRow] = useState<TenantType | null>(locationRow || null);
  
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

  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={1} sx={styles.detailsCard}>
        <TenantCard tenant={tenant} />
      </Stack>
      <Stack direction="row" sx={styles.detailsCard}>
        <LeaseDetailsCard
          unit="Orchid House | Unit O"
          address="4, Shaw Road (Onilegbale Road) Ikoyi"
          details={leaseDetails}
        />
      </Stack>
      <Stack spacing={1} sx={styles.detailsCard}>
        <HistoryTable />
      </Stack>
      <Stack spacing={1} sx={styles.detailsCard}>
        <TenantDocument />
      </Stack>
    </Stack>
  );
};

export default TenantDetails;
