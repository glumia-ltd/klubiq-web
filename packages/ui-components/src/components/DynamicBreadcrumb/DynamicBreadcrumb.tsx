// packages/ui-components/src/components/DynamicBreadcrumb/DynamicBreadcrumb.tsx
import React, { useMemo } from 'react';
import { Breadcrumbs, Link, Typography, Stack } from '@mui/material';
//import { Home } from '@mui/icons-material';
import { DynamicBreadcrumbProps, RouteConfig, BreadcrumbRoute } from './types';
import { NavigateNext } from '@mui/icons-material';

export const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({
  currentPath,
  routeMap,
  onNavigate,
  sx = {},
  separator = <NavigateNext fontSize="small" />,
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
}) => {
  // Build breadcrumbs dynamically based on current path
  const breadcrumbs = useMemo(() => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    const breadcrumbItems: BreadcrumbRoute[] = [];
    
    // Always add home
    // breadcrumbItems.push({
    //   id: 'home',
    //   path: '/',
    //   slug: 'Home',
    //   icon: <Home fontSize="small" />,
    // });

    let currentPathBuilder = '';
    
    pathSegments.forEach((segment, index) => {
      currentPathBuilder += `/${segment}`;
      
      // Find matching route config
      const routeConfig = findRouteConfig(currentPathBuilder, routeMap);
      
      if (routeConfig) {
        breadcrumbItems.push({
          id: `${segment}-${index}`,
          path: currentPathBuilder,
          slug: routeConfig.slug,
          icon: routeConfig.icon,
        });
      } else {
        // Fallback for unknown routes
        breadcrumbItems.push({
          id: `${segment}-${index}`,
          path: currentPathBuilder,
          slug: segment.charAt(0).toUpperCase() + segment.slice(1),
        });
      }
    });

    return breadcrumbItems;
  }, [currentPath, routeMap]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <Breadcrumbs
      separator={separator}
      aria-label="breadcrumb"
      maxItems={maxItems}
      itemsBeforeCollapse={itemsBeforeCollapse}
      itemsAfterCollapse={itemsAfterCollapse}
      sx={sx}
    >
      {breadcrumbs.map((route, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const label = (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {route.icon && <span>{route.icon}</span>}
            <span>{route.slug}</span>
          </Stack>
        );

        if (isLast) {
          return (
            <Typography 
              key={route.id} 
              color="text.primary" 
              fontWeight={600}
              sx={{ display: 'flex', alignItems: 'center', direction: 'row', gap: 0.5 }}
            >
              {route.icon && <span>{route.icon}</span>}
              <span>{route.slug}</span>
            </Typography>
          );
        }

        return (
          <Link
            key={route.id}
            color="inherit"
            underline="hover"
            sx={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              '&:hover': {
                color: 'primary.main',
              }
            }}
            onClick={() => onNavigate?.(route.path)}
            aria-label={route.slug}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

// Helper function to find route config
const findRouteConfig = (path: string, routeMap: Record<string, RouteConfig>): RouteConfig | null => {
  // First try exact match
  if (routeMap[path]) {
    return routeMap[path];
  }

  // Then try pattern matching for dynamic routes
  const pathSegments = path.split('/').filter(Boolean);
  
  for (const [routePath, config] of Object.entries(routeMap)) {
    if (config.dynamic) {
      const routeSegments = routePath.split('/').filter(Boolean);
      
      if (pathSegments.length === routeSegments.length) {
        let matches = true;
        for (let i = 0; i < routeSegments.length; i++) {
          if (routeSegments[i].startsWith(':')) {
            // Dynamic segment, always matches
            continue;
          }
          if (routeSegments[i] !== pathSegments[i]) {
            matches = false;
            break;
          }
        }
        
        if (matches) {
          return config;
        }
      }
    }
  }

  return null;
};