// src/authz/AppRootGuard.tsx
import { PropsWithChildren, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, LinearProgress } from '@mui/material';
import { useGetPermissionsQuery } from '../store/AuthStore/authApiSlice';
import { getAuthState } from '../store/AuthStore/AuthSlice'; // <- if you don't have this, use RootState selector
import { readPermCookie } from './perm-token';
import Loader from '../components/LoaderComponent/Loader';

const FullPageSkeleton = () => (
  <Box sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
    <CircularProgress />
  </Box>
);

export default function AppRootGuard({ children }: PropsWithChildren) {
  // expects your auth slice to expose isSignedIn, orgId, roleName
  const hasCookie = readPermCookie('_kbq_pt');
  const { user } = useSelector(getAuthState);
  const { organizationUuid, role } = user;

  // Only fetch perms for signed-in users with a known org/role
  const shouldFetch = useMemo(
        () => Boolean(hasCookie || (organizationUuid && role)),
        [hasCookie, organizationUuid, role]
  );

  const { data, isLoading, isFetching } = useGetPermissionsQuery(
    { orgId: hasCookie?.orgUuid! || organizationUuid!, roleName: hasCookie?.role! || role! },
    { skip: !shouldFetch }
  );

  // First-ever signed-in render: block until we have perms (cookie or network)
  if (shouldFetch && !data && isLoading) return <Loader />;

  // Otherwise render the app; show a thin progress bar while refreshing
  return (
    <>
      {shouldFetch && isFetching && (
        // <LinearProgress sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2000 }} />
        <Loader />
      )}
      {children}
    </>
  );
}
