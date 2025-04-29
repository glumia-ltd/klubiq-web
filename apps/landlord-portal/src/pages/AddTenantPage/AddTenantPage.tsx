import AddTenant from '../../components/SingleUnitForms/TenantForm/AddTenant';
import AddPropertiesInformationLayout from '../../Layouts/AddPropertiesInformationLayout';
import { useLocation } from 'react-router-dom';
import { PropertyDataType } from '../../shared/type';

type LocationState = {
	currentProperty?: PropertyDataType;
};
const AddTenantPage = () => {
	const location = useLocation() as { state: LocationState };
	const { currentProperty } = location.state || {};

	return (
		<AddPropertiesInformationLayout>
			{currentProperty ? (
				<AddTenant propertyDetails={currentProperty} />
			) : (
				<div>Error: Property details are missing.</div>
			)}
		</AddPropertiesInformationLayout>
	);
};

export default AddTenantPage;
