import { useGetPermissionsQuery } from '../store/AuthStore/authApiSlice';
import { computeCan } from './compute-can';

export function useCan(orgId: string, roleName: string) {
  const { data, isFetching, isLoading, isError } =
    useGetPermissionsQuery({ orgId, roleName });
  return {
    can: computeCan(data?.permissions),
    loading: isLoading || isFetching,
    error: isError,
    version: data?.version,
    permissions: data?.permissions ?? [],
  };
}
