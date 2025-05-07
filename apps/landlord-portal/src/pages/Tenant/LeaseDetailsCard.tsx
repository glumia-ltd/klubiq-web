import { Stack, Typography, Card, Box } from '@mui/material';
import { LeaseDetail } from '../../shared/type';
import { styles } from './styles';

interface LeaseDetailsCardProps {
  unit: string;
  address: string;
  details: LeaseDetail[];
}

const LeaseDetailsCard = ({ unit, address, details }: LeaseDetailsCardProps) => {
  return (
    <Card sx={styles.detailsCard}>
      <Stack direction="column" spacing={3}>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={2} sx={styles.firstBox}>
            <Typography sx={styles.nameText2}>Current Lease</Typography>
            <Typography sx={styles.cardTwoText}>{unit}</Typography>
          </Stack>
          <Typography sx={styles.typo3}>{address}</Typography>
        </Stack>
        <Box display="flex" justifyContent="space-between">
          {details.map((item, index) => (
            <Box key={index}>
              <Typography sx={styles.typo2}>{item.name}</Typography>
              <Typography sx={styles.nameText}>{item.amount}</Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Card>
  );
};

export default LeaseDetailsCard;
