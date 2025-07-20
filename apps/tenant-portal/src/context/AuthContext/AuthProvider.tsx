import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	useGetUserByFbidQuery,
	useSignOutMutation,
	} from '@/store/AuthStore/authApi.slice';
	import { saveUser, removeUser } from '@/store/AuthStore/auth.slice';
import { RootState } from '@/store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	const { data: user, error } = useGetUserByFbidQuery(undefined, {
		skip: !isAuthenticated,
	});
	const [signOut] = useSignOutMutation();

	useEffect(() => {
		const handleAuth = async () => {
			if (user) {
				dispatch(saveUser({ user, isAuthenticated: true }));
			} else if (error) {
				dispatch(removeUser());
				if (isAuthenticated) {
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
