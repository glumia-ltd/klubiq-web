import AddTenant from '../../components/SingleUnitForms/TenantForm/AddTenant';
import AddPropertiesInformationLayout from '../../Layouts/AddPropertiesInformationLayout';
import { useLocation } from 'react-router-dom';
import { PropertyDataType } from '../../shared/type';

// const useQuery = () => {
// 	return new URLSearchParams(useLocation().search);
// };

interface LocationState {
    currentProperty?: PropertyDataType // Define the type of currentProperty
}
const AddTenantPage = () => {
	const location = useLocation() as { state: LocationState };
	const { currentProperty } = location.state || {}; // Destructure currentProperty from state
	// if (!currentProperty) {
	// 	// Handle the case where currentProperty is not available
	// 	return <div>Error: Property not found.</div>;
	// }
	// const query = useQuery();
	// const propertyId = query.get('property');
	// const unitId = query.get('unit');
	return (
		<AddPropertiesInformationLayout>
			{currentProperty ? (
								<AddTenant propertyDetails={currentProperty} />

				// <AddTenant propertyDetails={currentProperty} propertyId={propertyId} unitId={unitId} />
			) : (
				<div>Error: Property details are missing.</div>
			)}
		</AddPropertiesInformationLayout>
	);
};

export default AddTenantPage;
