import { useGetPermissionsQuery } from '../store/AuthStore/authApiSlice';
import { computeCan } from './compute-can';

type UseCanOpts= {
  enabled?: boolean;
}
export function useCan(orgId: string, roleName: string, opts: UseCanOpts = {}) {
  const enabled = opts.enabled !== false;
  const { data, isFetching, isLoading, isError } =
    useGetPermissionsQuery({ orgId, roleName }, { skip: !enabled });
  return {
    can: computeCan(data?.permissions),
    loading: isLoading || isFetching,
    error: isError,
    version: data?.version,
    permissions: data?.permissions ?? [],
  };
}
