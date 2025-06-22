import React, { useState } from 'react';
import { Box, Paper, Stack, Typography, Chip, IconButton, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import { Close, MailOutline, Phone } from '@mui/icons-material';
import { DynamicAvatar } from '../DynamicAvatar/DynamicAvatar';
import { InfoCard } from '../InfoCard/InfoCard';
import { DocumentList } from '../DocumentList/DocumentList';
import { PageDetailProps } from './types';
import { PageDetailSkeleton } from './PageDetailSkeleton';

const TabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
};

export const PageDetail: React.FC<PageDetailProps> = ({
  headerData,
  detailSections,
  showTabs = true,
  tabs: customTabs,
  onClose,
  loading = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  if (loading) {
    return <PageDetailSkeleton showTabs={showTabs} />;
  }

  const detailsContent = (
    <Stack spacing={2}>
        {detailSections?.map((section) => {
            switch (section.type) {
                case 'infoCard':
                    return <InfoCard key={section.id} title={section.title} items={section.items} />;
                case 'documentList':
                    return <DocumentList key={section.id} title={section.title} items={section.items} />;
                case 'custom':
                    return <React.Fragment key={section.id}>{section.content}</React.Fragment>;
                default:
                    return null;
            }
        })}
    </Stack>
  );

  const defaultTabs = [
      {label: "Details", content: detailsContent}, 
      {label: "Chat", content: <Typography>Chat functionality is not yet implemented.</Typography>}
    ];

  const tabs = customTabs || defaultTabs;
  
  return (
    <Paper
      elevation={3}
      sx={{
        width: isMobile ? '100%' : 400,
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <DynamicAvatar items={[headerData.avatar]} size="large" />
          <Stack flex={1} spacing={0.5}>
            <Typography variant="h6" fontWeight={600}>
              {headerData.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
              <MailOutline fontSize="small" />
              <Typography variant="body2">{headerData.email}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
              <Phone fontSize="small" />
              <Typography variant="body2">{headerData.phone}</Typography>
            </Stack>
          </Stack>
          <Chip
            label={headerData.status}
            color={headerData.status === 'Active' ? 'primary' : 'default'}
            size="small"
            sx={{
                backgroundColor: '#e2eaf2',
                color: '#005CFF'
            }}
          />
          {onClose && <IconButton onClick={onClose} sx={{position: 'absolute', top: 8, right: 8}}>
            <Close />
          </IconButton>}
        </Stack>
      </Box>

      {showTabs && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            {tabs.map(tab => <Tab key={tab.label} label={tab.label} />)}
          </Tabs>
        </Box>
      )}

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {showTabs ? tabs.map((tab, index) => (
             <TabPanel key={tab.label} value={tabValue} index={index}>
                {tab.content}
            </TabPanel>
        )) : <Box p={2}>{detailsContent}</Box>}
      </Box>
    </Paper>
  );
}; 