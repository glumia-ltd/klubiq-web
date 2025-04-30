import AddPropertiesInformationLayout from '../../Layouts/AddPropertiesInformationLayout';
import { useLocation } from 'react-router-dom';
import { InviteTenantPropertyDetailsType } from '../../shared/type';
import InviteTenantForm from '../../components/Forms/InviteTenantForm';

type AddTenantState = {
	mode: string;
	propertyDetails?: InviteTenantPropertyDetailsType;
	returnPath: string;

};
const AddTenant = () => {
	const location = useLocation();
	const { mode, propertyDetails, returnPath } = location.state as AddTenantState;

	return (
		<AddPropertiesInformationLayout>
			{mode === 'onboarding' && propertyDetails ? (
				<InviteTenantForm propertyDetails={propertyDetails} returnPath={returnPath} formHeader='Invite Tenant' />
			) : (
				<div>Error: Property details are missing.</div>
			)}
		</AddPropertiesInformationLayout>
	);
};

export default AddTenant;
