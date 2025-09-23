// src/authz/AppRootGuard.tsx
import { PropsWithChildren, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetPermissionsQuery } from '../store/AuthStore/authApiSlice';
import { getAuthState } from '../store/AuthStore/AuthSlice'; // <- if you don't have this, use RootState selector
import { readPermCookie } from './perm-token';
import Loader from '../components/LoaderComponent/Loader';

export default function AppRootGuard({ children }: PropsWithChildren) {
  // expects your auth slice to expose isSignedIn, orgId, roleName
  const hasCookie = readPermCookie('_kbq_pt');
  const { user, hasBeginSession } = useSelector(getAuthState);
  const { organizationUuid, role } = user;

  // Only fetch perms for signed-in users with a known org/role
  const shouldFetch = useMemo(
        () => hasBeginSession && Boolean(hasCookie || (organizationUuid && role)),
        [hasBeginSession, hasCookie, organizationUuid, role]
  );

  const {isFetching } = useGetPermissionsQuery(
    { orgId: hasCookie?.orgUuid! || organizationUuid!, roleName: hasCookie?.role! || role! },
    { skip: !shouldFetch }
  );

  return (
    <>
      {shouldFetch && isFetching && (
        <Loader />
      )}
      {children}
    </>
  );
}
