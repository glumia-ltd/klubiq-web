import { useLocation } from 'react-router-dom';

import { useGetSinglePropertyByUUIDQuery } from '../../store/PropertyPageStore/propertyApiSlice';

import { PropertyUnitComponent } from '../../components/PropertyUnitComponent/PropertyUnitComponent';

const PropertyPage = () => {
	const location = useLocation();

	const currentUUId = location.pathname.split('/')[2]!;

	const { data: currentProperty, isLoading: isCurrentPropertyLoading } =
		useGetSinglePropertyByUUIDQuery({
			uuid: currentUUId || '',
		});

	return <PropertyUnitComponent currentProperty={currentProperty} />;
};

export default PropertyPage;
