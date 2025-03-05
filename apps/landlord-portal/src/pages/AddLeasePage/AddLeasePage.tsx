import AddLeaseForm from '../../components/SingleUnitForms/LeaseInfoForm/AddLeaseForm';
import AddPropertiesInformationLayout from '../../Layouts/AddPropertiesInformationLayout';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const AddLeasePage = () => {
	const query = useQuery();
	const propertyId = query.get('property');

	return (
		<AddPropertiesInformationLayout>
			<AddLeaseForm propertyId={propertyId} />
		</AddPropertiesInformationLayout>
	);
};

export default AddLeasePage;
