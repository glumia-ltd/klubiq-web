import { useRouteError } from 'react-router-dom';
import { ErrorBoundary } from '@klubiq/ui-components';

const ErrorComponent = () => {
	const error = useRouteError() as Error;

	return (
		<div style={{ padding: '20px', textAlign: 'center' }}>
			<h1>Page is in development</h1>
			<p>There is an error sha.</p>
			<p>
				<i>{error.message}</i>
			</p>
			<ErrorBoundary fallback={<div>Error</div>}>
				<div>
					<h1>Page is in development</h1>
					<p>There is an error sha.</p>
					<p><i>{error.message}</i></p>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default ErrorComponent;
