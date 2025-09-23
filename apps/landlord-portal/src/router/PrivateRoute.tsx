
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../store/AuthStore/AuthSlice';
import { useCan } from '../authz/use-can';
import type { PermissionType } from '../store/AuthStore/authType';

type Props = {
  /** At least ONE of these permissions must be present */
  any?: PermissionType[];
  /** ALL of these permissions must be present */
  all?: PermissionType[];
  /** Where to send users who fail the permission check */
  redirectTo?: string;
  /** Optional: override org/role if not in auth state */
  orgId?: string;
  roleName?: string;
  /** Show a loader while permissions load (default true) */
  showLoader?: boolean;
  /** Optional loader element */
  loader?: React.ReactNode;
};

const PrivateRoute: React.FC<Props> = ({
  any,
  all,
  redirectTo = '/unauthorized',
  orgId: orgIdProp,
  roleName: roleNameProp,
  showLoader = true,
  loader = null,
}) => {
  const location = useLocation();
  const { isSignedIn, user, hasBeginSession } = useSelector(getAuthState);
  const { organizationUuid, role } = user;

  // Resolve org/role (props override store if provided)
  const orgId = orgIdProp ?? organizationUuid;
  const roleName = roleNameProp ?? role;
  // If route doesn't require perms, just allow signed-in users
  const routeHasPerms = Boolean((any && any.length) || (all && all.length));
  const shouldCheckPerms = isSignedIn && hasBeginSession && routeHasPerms && Boolean(orgId && roleName);


  const { can, loading, error } = useCan(orgId || '', roleName || '', { enabled: shouldCheckPerms });
  
  if (!isSignedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!routeHasPerms) {
    return <Outlet />;
  }

  if (!shouldCheckPerms) {
    return <Outlet />;
  }

  if (!hasBeginSession) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!orgId || !roleName) {
    return <Outlet />;
  }

  if (loading && showLoader) return <>{loader}</> // plug your spinner here if you like

  // If the permissions request failed, fail closed for safety
  if (error) return <Navigate to={redirectTo} replace state={{ from: location }} />;

  const ok =
    (all && all.length ? can(all, 'all') : false) ||
    (any && any.length ? can(any, 'any') : false);

  return ok ? <Outlet /> : <Navigate to={redirectTo} replace state={{ from: location }} />;
};

export default PrivateRoute;
