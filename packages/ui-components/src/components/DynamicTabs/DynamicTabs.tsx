import React, { ReactNode, useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Chip,
  Divider,
  Stack,
  SxProps,
  Tab,
  Tabs,
  TabsProps,
  Typography,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import type { Breakpoint } from '@mui/material/styles'

export type TabOrientation = 'vertical' | 'horizontal'
export type TabPosition = 'top' | 'bottom' | 'left' | 'right'

export type ActiveTabIndicatorOptions = {
  borderIndicator?: boolean
  borderPosition?: 'top' | 'bottom' | 'left' | 'right'
  backgroundIndicator?: boolean
  backgroundColor?: string
  indicatorSx?: SxProps
}

export type DynamicTabItem = {
  id: string
  label: ReactNode | string
  contentNode: ReactNode
  icon?: ReactNode
  badge?: {
    content: ReactNode
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  }
  chip?: {
    label: ReactNode
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
    size?: 'small' | 'medium'
    variant?: 'filled' | 'outlined'
  }
  disabled?: boolean
  sx?: SxProps
}

export type DynamicTabsProps = {
  tabOrientation: TabOrientation
  tabItems: DynamicTabItem[]
  tabPosition?: TabPosition
  value?: number
  defaultValue?: number
  onChange?: (index: number, item: DynamicTabItem) => void
  tabButtonSx?: SxProps
  tabContentSx?: SxProps
  useTabContentDivider?: boolean
  activeTabIndicator?: ActiveTabIndicatorOptions
  keepMounted?: boolean
  tabsProps?: Omit<TabsProps, 'orientation' | 'value' | 'onChange'>
  responsiveBreakpoint?: Breakpoint
}

const a11yProps = (index: number) => ({
  id: `klb-tab-${index}`,
  'aria-controls': `klb-tabpanel-${index}`,
})

const renderTabLabel = (item: DynamicTabItem) => {
  const baseLabel = typeof item.label === 'string' ? (
    <Typography variant="body2">{item.label}</Typography>
  ) : (
    item.label
  )

  const labelWithChip = item.chip ? (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box component="span">{baseLabel}</Box>
      <Chip size={item.chip.size ?? 'small'} color={item.chip.color ?? 'default'} variant={item.chip.variant ?? 'filled'} label={item.chip.label} />
    </Stack>
  ) : (
    baseLabel
  )

  if (item.badge) {
    return (
      <Badge color={item.badge.color ?? 'primary'} badgeContent={item.badge.content} overlap="rectangular">
        <Box component="span">{labelWithChip}</Box>
      </Badge>
    )
  }
  return labelWithChip
}

export const DynamicTabs: React.FC<DynamicTabsProps> = ({
  tabOrientation,
  tabItems,
  tabPosition,
  value,
  defaultValue = 0,
  onChange,
  tabButtonSx,
  tabContentSx,
  useTabContentDivider = false,
  activeTabIndicator,
  keepMounted = true,
  tabsProps,
  responsiveBreakpoint = 'sm',
}) => {
  const isControlled = typeof value === 'number'
  const [internal, setInternal] = useState<number>(defaultValue)
  const activeIndex = isControlled ? (value as number) : internal

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down(responsiveBreakpoint))
  const actualOrientation: TabOrientation = tabOrientation === 'vertical' && isSmall ? 'horizontal' : tabOrientation

  const computedPosition: TabPosition = useMemo(() => {
    if (tabPosition) return tabPosition
    return actualOrientation === 'vertical' ? 'left' : 'top'
  }, [actualOrientation, tabPosition])

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (!isControlled) {
      setInternal(newValue)
    }
    onChange?.(newValue, tabItems[newValue])
  }

  const indicatorSx: SxProps | undefined = useMemo(() => {
    if (!activeTabIndicator) {
      return undefined
    }
    const { backgroundIndicator, backgroundColor } = activeTabIndicator
    return backgroundIndicator
      ? { backgroundColor: backgroundColor ?? 'primary.main', ...(activeTabIndicator.indicatorSx || {}) }
      : activeTabIndicator.indicatorSx
  }, [activeTabIndicator])

  const selectedBorderSx: SxProps | undefined = useMemo(() => {
    if (!activeTabIndicator?.borderIndicator) {
      return undefined
    }
    const side = activeTabIndicator.borderPosition ?? (actualOrientation === 'vertical' ? 'left' : 'bottom')
    const borderKey = `border${side.charAt(0).toUpperCase()}${side.slice(1)}` as const
    const style: Record<string, unknown> = {
      [`&.Mui-selected`]: {
        [borderKey]: `2px solid ${activeTabIndicator.backgroundColor ?? 'primary.main'}`,
        borderRadius: 1,
      },
    }
    return style
  }, [activeTabIndicator, actualOrientation])

  const toSxObject = (sx: SxProps | undefined): Record<string, unknown> => {
    if (!sx) {
      return {}
    }
    if (Array.isArray(sx)) {
      return {}
    }
    if (typeof sx === 'function') {
      return {}
    }
    if (typeof sx === 'object') {
      return sx as Record<string, unknown>
    }
    return {}
  }

  const tabsNode = (
    <Tabs
      value={activeIndex}
      onChange={handleChange}
      orientation={actualOrientation}
      variant={actualOrientation === 'horizontal' ? 'scrollable' : 'standard'}
      scrollButtons={actualOrientation === 'horizontal' ? 'auto' : undefined}
      TabIndicatorProps={{ sx: indicatorSx }}
      {...tabsProps}
    >
      {tabItems.map((item, idx) => (
        <Tab
          key={item.id}
          icon={item.icon ? (item.icon as any) : undefined}
          iconPosition="start"
          label={renderTabLabel(item)}
          disabled={item.disabled}
          sx={{
            textTransform: 'none',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: 40,
            ...toSxObject(selectedBorderSx),
            ...toSxObject(item.sx),
            ...toSxObject(tabButtonSx),
          }}
          {...a11yProps(idx)}
        />
      ))}
    </Tabs>
  )

  const panelsNode = (
    <Box sx={{ flex: 1, width: '100%', ...(tabContentSx || {}) }}>
      {tabItems.map((item, idx) => {
        const isHidden = activeIndex !== idx
        if (!keepMounted && isHidden) {
          return null
        }
        return (
          <Box
            key={item.id}
            role="tabpanel"
            hidden={isHidden}
            id={`klb-tabpanel-${idx}`}
            aria-labelledby={`klb-tab-${idx}`}
            sx={{ width: '100%' }}
          >
            {!isHidden && <Box sx={{ width: '100%' }}>{item.contentNode}</Box>}
          </Box>
        )
      })}
    </Box>
  )

  const vertical = computedPosition === 'left' || computedPosition === 'right'
  const tabsFirst = computedPosition === 'top' || computedPosition === 'left'

  return (
    <Stack direction={vertical ? 'row' : 'column'} sx={{ width: '100%' }} spacing={vertical ? 2 : 1}>
      {tabsFirst && tabsNode}
      {useTabContentDivider && (vertical ? <Divider orientation="vertical" flexItem /> : <Divider />)}
      {panelsNode}
      {!tabsFirst && tabsNode}
    </Stack>
  )
}


