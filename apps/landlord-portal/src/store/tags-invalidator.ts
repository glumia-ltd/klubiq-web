import { propertyApiSlice } from './PropertyPageStore/propertyApiSlice';
import { tenantApiSlice } from './TenantStore/tenantApiSlice';
import { leaseApiSlice } from './LeaseStore/leaseApiSlice';
import { Dispatch } from 'react';


  export const invalidateMultipleTags = (dispatch: Dispatch<any>, tags: any[]) => {
    const apis = [propertyApiSlice, tenantApiSlice, leaseApiSlice];
    apis.forEach(api => {
      dispatch(api.util.invalidateTags(tags as any));
    });
  };
  