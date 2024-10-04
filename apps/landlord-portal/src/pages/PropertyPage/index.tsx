import { useLocation } from 'react-router-dom';
import { UnitSkeleton } from './UnitSkeleton';
import { useGetSinglePropertyByUUIDQuery } from '../../store/PropertyPageStore/propertyApiSlice';

import { PropertyUnitComponent } from '../../components/PropertyUnitComponent/PropertyUnitComponent';

const PropertyPage = () => {
	const location = useLocation();

	const currentUUId = location.pathname.split('/')[2]!;

	const { data: currentProperty, isLoading: isCurrentPropertyLoading } =
		useGetSinglePropertyByUUIDQuery({
			uuid: currentUUId || '',
		});

	return isCurrentPropertyLoading ? (
		<UnitSkeleton currentProperty={currentProperty} />
	) : (
		<PropertyUnitComponent currentProperty={currentProperty} />
	);
};

export default PropertyPage;
