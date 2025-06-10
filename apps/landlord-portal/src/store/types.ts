export const API_TAGS = {
    PROPERTY: 'Property',
    PROPERTY_METADATA: 'Property-Metadata',
    TENANT: 'Tenant',
    LEASE: 'Lease',
    LEASE_METADATA: 'Lease-Metadata',
    TENANT_FILTER_METADATA: 'Tenant-Filter-Metadata',
    ORGANIZATION: 'Organization',
    NOTIFICATION: 'Notification',
    USER: 'User',
    DASHBOARD_METRICS: 'Dashboard-Metrics',
    DASHBOARD_REVENUE_REPORT: 'Dashboard-Revenue-Report',
  } as const;
export const ALL_TAGS = Object.values(API_TAGS);