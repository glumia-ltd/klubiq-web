import AddLeaseForm from '../../components/SingleUnitForms/LeaseInfoForm/AddLeaseForm';
import AddPropertiesInformationLayout from '../../Layouts/AddPropertiesInformationLayout';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const AddLeasePage = () => {
	const query = useQuery();
	const propertyId = query.get('property');
	const unitId = query.get('unit');

	return (
		<AddPropertiesInformationLayout>
			<AddLeaseForm propertyId={propertyId} unitId={unitId} />
		</AddPropertiesInformationLayout>
	);
};

export default AddLeasePage;
