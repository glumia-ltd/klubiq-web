import { Tabs, Tab, Box, TabsProps, TabProps } from '@mui/material'
import { ReactNode, useState } from 'react'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

interface TabsComponentProps extends Omit<TabsProps, 'onChange'> {
  tabs: {
    label: string
    content: ReactNode
    icon?: TabProps['icon']
    disabled?: boolean
  }[]
  onChange?: (index: number) => void
}

const TabsComponent = ({ tabs, onChange, ...props }: TabsComponentProps) => {
  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          {...props}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              disabled={tab.disabled}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  )
}

export default TabsComponent 