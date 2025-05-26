import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	useGetUserByFbidQuery,
	useSignOutMutation,
} from '../../store/AuthStore/authApiSlice';
import { saveUser, removeUser } from '../../store/AuthStore/AuthSlice';
import { RootState } from '../../store';
// import Loader from '../../components/LoaderComponent/Loader';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch();
	const { isSignedIn } = useSelector((state: RootState) => state.auth);
	const tenantId = sessionStorage.getItem('tenant_id');
	const { data: user, error } = useGetUserByFbidQuery(undefined, {
		skip: !tenantId || !isSignedIn,
	});
	const [signOut] = useSignOutMutation();

	useEffect(() => {
		console.log('AuthProvider mounted');
		const handleAuth = async () => {
			if (user) {
				dispatch(saveUser({ user, isSignedIn: true }));
			} else if (error) {
				dispatch(removeUser());
				if (isSignedIn || tenantId) {
					await signOut({});
				}
			}
		};
		handleAuth();
	}, [user, error]);

	// if (isLoading) {
	//   return <Loader />; // Your loading component
	// }

	return <>{children}</>;
};
