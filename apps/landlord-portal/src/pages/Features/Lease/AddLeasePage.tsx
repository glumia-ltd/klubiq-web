import AddLeaseForm from '../../../components/Forms/AddLeaseForm';
import AddPropertiesInformationLayout from '../../../Layouts/AddPropertiesInformationLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const AddLeasePage = () => {
	const query = useQuery();
	const navigate = useNavigate();
	const propertyId = query.get('property');
	const unitId = query.get('unit');
	const backButtonOnClick = () => {
		navigate('/leases');
	};

	return (
		<AddPropertiesInformationLayout backButtonText='Leases' backButtonOnClick={backButtonOnClick}>
			<AddLeaseForm propertyId={propertyId || ''} unitId={unitId || ''} />
		</AddPropertiesInformationLayout>
	);
};

export default AddLeasePage;
