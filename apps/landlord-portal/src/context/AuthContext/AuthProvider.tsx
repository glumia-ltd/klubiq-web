import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	useGetUserByFbidQuery,
	useSignOutMutation,
} from '../../store/AuthStore/authApiSlice';
import { saveUser, removeUser, endSession } from '../../store/AuthStore/AuthSlice';
import { RootState } from '../../store';
// import Loader from '../../components/LoaderComponent/Loader';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const dispatch = useDispatch();
	const { isSignedIn, hasBeginSession } = useSelector((state: RootState) => state.auth);
	const tenantId = sessionStorage.getItem('tenant_id');
	const { data: user, error } = useGetUserByFbidQuery(undefined, {
		skip: !hasBeginSession || !tenantId || !isSignedIn,
	});
	const [signOut] = useSignOutMutation();

	useEffect(() => {
		const handleAuth = async () => {
			if (user) {
				dispatch(saveUser({ user, isSignedIn: true, hasBeginSession: hasBeginSession }));
			} else if (error) {
				dispatch(endSession());
				dispatch(removeUser());
				if (isSignedIn || tenantId) {
					await signOut({});
				}
			}
		};
		handleAuth();
		
	}, [user, error, dispatch, isSignedIn, tenantId, signOut, hasBeginSession]);

	// if (isLoading) {
	//   return <Loader />; // Your loading component
	// }

	return <>{children}</>;
};
