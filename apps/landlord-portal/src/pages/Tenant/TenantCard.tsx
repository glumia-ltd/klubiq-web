import { Stack, Typography, IconButton, Box, Card } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import * as KlubiqIcons from '../../components/Icons/CustomIcons';
import { TenantInfo } from '../../shared/type';
import { styles } from './styles';

interface TenantCardProps {
  tenant: TenantInfo;
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  return (
    <Card sx={styles.detailsCard}>
      <Stack direction="row" spacing={0} justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={3}>
          <img src={tenant.image} alt="tenant" style={styles.imageStyle} />
          <Stack direction="column" spacing={5}>
            <Stack direction="row" spacing={3} sx={styles.firstBox}>
              <Typography sx={styles.nameText}>{tenant.name}</Typography>
              <IconButton>
                <KlubiqIcons.EditIcon sx={styles.iconStyleTwo} />
                <Typography sx={styles.boxText}>Edit</Typography>
              </IconButton>
            </Stack>
            <Stack direction="row" spacing={2}>
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
        <Stack direction="column" spacing={1}>
          <Typography sx={styles.detailsText}>Tenant Since</Typography>
          <Typography sx={styles.boxText}>{tenant.since}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TenantCard;
