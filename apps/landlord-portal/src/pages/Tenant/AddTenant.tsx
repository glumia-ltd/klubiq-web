import AddPropertiesInformationLayout from '../../Layouts/AddPropertiesInformationLayout';
import { useLocation } from 'react-router-dom';
import { AddTenantToLeaseDetailsType, InviteTenantPropertyDetailsType } from '../../shared/type';
import InviteTenantForm from '../../components/Forms/InviteTenantForm';
import AddTenantForm from '../../components/Forms/AddTenantForm';

type InviteTenantState = {
	mode: string;
	propertyDetails?: InviteTenantPropertyDetailsType;
	returnPath: string;
};

type AddTenantState = {
	mode: string;
	leaseAndUnitDetails: AddTenantToLeaseDetailsType;
	returnPath: string;
};


const AddTenant = () => {
	const location = useLocation();
	const { mode, propertyDetails, returnPath } = location.state as InviteTenantState;
	const { leaseAndUnitDetails } = location.state as AddTenantState;

	return (
		<AddPropertiesInformationLayout>
			{mode === 'onboarding' && propertyDetails ? (
				<InviteTenantForm propertyDetails={propertyDetails} returnPath={returnPath} formHeader='Invite Tenant' />
			) : (
				<AddTenantForm leaseAndUnitDetails={leaseAndUnitDetails} returnPath={returnPath} formHeader='Add Tenant' />
			)}
		</AddPropertiesInformationLayout>
	);
};

export default AddTenant;
