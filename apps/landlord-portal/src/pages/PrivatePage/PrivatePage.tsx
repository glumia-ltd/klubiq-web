import { useEffect } from 'react';
import { api } from '../../api';
import { authEndpoints } from '../../helpers/endpoints';
// import { useSelector } from 'react-redux';
// import { getAuthState } from '../../store/AuthStore/AuthSlice';

function PrivatePage() {
	// const {
	// 	user: { uid },
	// } = useSelector(getAuthState);

	const getUser = async () => {
		await api.get(authEndpoints.getUserByFbid());
	};

	useEffect(() => {
		getUser();
	}, []);
	return (
		<div>
			<h1>This is only available to signed in users</h1>

			<button>Click to Sign out</button>
		</div>
	);
}

export default PrivatePage;
