import AddPropertiesInformationLayout from '../../../Layouts/AddPropertiesInformationLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddTenantToLeaseDetailsType, InviteTenantPropertyDetailsType } from '../../../shared/type';
import InviteTenantForm from '../../../components/Forms/InviteTenantForm';
import AddTenantForm from '../../../components/Forms/AddTenantForm';

type InviteTenantState = {
	mode: string;
	propertyDetails?: InviteTenantPropertyDetailsType;
	returnPath: string;
	formHeader?: string;
};

type AddTenantState = {
	mode: string;
	leaseAndUnitDetails: AddTenantToLeaseDetailsType;
	returnPath: string;
	formHeader?: string;
};

const AddTenant = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const state = location.state as InviteTenantState | AddTenantState | null;
	
	if (!state || !state.mode) {
		navigate('/');
		return null;
	}

	const { mode, returnPath, formHeader } = state;
	const propertyDetails = 'propertyDetails' in state ? state.propertyDetails : undefined;
	const leaseAndUnitDetails = 'leaseAndUnitDetails' in state ? state.leaseAndUnitDetails : undefined;

	return (
		<AddPropertiesInformationLayout>
			{mode === 'onboarding' && propertyDetails ? (
				<InviteTenantForm propertyDetails={propertyDetails} returnPath={returnPath} formHeader={formHeader || 'Invite Tenant'} />
			) : (
				<AddTenantForm leaseAndUnitDetails={leaseAndUnitDetails!} returnPath={returnPath} formHeader={formHeader || 'Add Tenant'} />
			)}
		</AddPropertiesInformationLayout>
	);
};

export default AddTenant;
