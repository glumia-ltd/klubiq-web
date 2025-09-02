// import { Outlet, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getAuthState } from '../store/AuthStore/AuthSlice';
// // import useAuth from '../hooks/useAuth';
// // import MFAPrompt from '../components/Dialogs/MfaPrompts';
// // import { SessionTimeoutProvider } from '../context/SessionContext/SessionTimeoutContext';
// // import AlertDialog from '../components/Dialogs/AlertDialog';
// import { useCan } from '../authz/use-can';
// import { consoleDebug } from '../helpers/debug-logger';
// import { PermissionType } from '../store/AuthStore/authType';

// const PrivateRoute = () => {
// 	const {isSignedIn } = useSelector(getAuthState);


// 	const loginUrl = 'login';
// 	if (!isSignedIn) {
// 		return <Navigate to={loginUrl} replace={true} />;
// 	}

// 	return (
// 		<Outlet />
// 		// <SessionTimeoutProvider>
// 		// 	{showMFAPrompt && (
// 		// 		<MFAPrompt
// 		// 			open={showMFAPrompt}
// 		// 			onClose={() => {
// 		// 				handleCloseMFAPrompt();
// 		// 			}}
// 		// 			onMFASetupClick={goToMFASetup}
// 		// 			onOptOutClick={optOutOf2fa}
// 		// 		></MFAPrompt>
// 		// 	)}
// 		// 	{alertDialogs.length > 0 &&
// 		// 		alertDialogs.map((alert) => (
// 		// 			<AlertDialog
// 		// 				key={alert.id}
// 		// 				open={alert.open}
// 		// 				title={alert.title}
// 		// 				message={alert.message}
// 		// 				onClose={alert.onClose}
// 		// 				onConfirmClick={alert.onConfirmClick}
// 		// 				onCancelClick={alert.onCancelClick}
// 		// 				id={alert.id}
// 		// 				cancelButtonText={alert.cancelButtonText}
// 		// 				confirmButtonText={alert.confirmButtonText}
// 		// 			></AlertDialog>
// 		// 		))}
// 		// 	<Outlet />
// 		// </SessionTimeoutProvider>
// 	);
// };

// export default PrivateRoute;


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
  const { isSignedIn, user } = useSelector(getAuthState);
  const { organizationUuid, role } = user;

  if (!isSignedIn) {
    return <Navigate to="login" replace state={{ from: location }} />;
  }

  // Resolve org/role (props override store if provided)
  const orgId = orgIdProp ?? organizationUuid;
  const roleName = roleNameProp ?? role;

  // If route doesn't require perms, just allow signed-in users
  const routeHasPerms = Boolean((any && any.length) || (all && all.length));
  if (!routeHasPerms) return <Outlet />;

  const { can, loading, error } = useCan(orgId, roleName);

  if (loading && showLoader) return <>{loader}</> // plug your spinner here if you like

  // If the permissions request failed, fail closed for safety
  if (error) return <Navigate to={redirectTo} replace state={{ from: location }} />;

  const ok =
    (all && all.length ? can(all, 'all') : false) ||
    (any && any.length ? can(any, 'any') : false);

  return ok ? <Outlet /> : <Navigate to={redirectTo} replace state={{ from: location }} />;
};

export default PrivateRoute;
