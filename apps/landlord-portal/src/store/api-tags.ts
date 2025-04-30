import { propertyApiSlice } from './PropertyPageStore/propertyApiSlice';
import { tenantApiSlice } from './TenantStore/tenantApiSlice';
import { leaseApiSlice } from './LeaseStore/leaseApiSlice';
import { Dispatch } from 'react';
export const API_TAGS = {
    PROPERTY: 'Property',
    PROPERTY_METADATA: 'Property-Metadata',
    TENANT: 'Tenant',
    LEASE: 'Lease',
    LEASE_METADATA: 'Lease-Metadata',
    TENANT_FILTER_METADATA: 'Tenant-Filter-Metadata',
    ORGANIZATION: 'Organization',
    NOTIFICATION: 'Notification',
  } as const;

  export const invalidateMultipleTags = (dispatch: Dispatch<any>, tags: string[]) => {
    const apis = [propertyApiSlice, tenantApiSlice, leaseApiSlice];
    apis.forEach(api => {
      dispatch(api.util.invalidateTags(tags as any));
    });
  };
  