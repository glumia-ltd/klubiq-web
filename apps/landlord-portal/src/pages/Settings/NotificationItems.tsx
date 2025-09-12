/* eslint-disable no-unused-vars */
import { Typography, Switch, Box } from '@mui/material';

type NotificationItemProps = {
  id: string; 
  title: string;
  description: string;
  icon?: React.ReactNode;
  checked: boolean;
  onToggle: (id: string, value: boolean) => void;
};

const NotificationItem = ({
  id, 
  title,
  description,
  icon,
  checked,
  onToggle,
}: NotificationItemProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 2,
      mt: 2,
    }}
  >
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {icon}
        <Typography variant="subtitle1" mb={1}>
          {title}
        </Typography>
      </Box>
      <Typography>{description}</Typography>
    </Box>
    <Switch
      size="medium"
      checked={checked}
      onChange={(e) => onToggle(id, e.target.checked)}
    />
  </Box>
);

export default NotificationItem;
