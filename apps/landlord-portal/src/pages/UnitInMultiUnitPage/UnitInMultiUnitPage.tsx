import { useLocation } from 'react-router-dom';
import { UnitInMultiUnitComponent } from '../../components/PropertyUnitComponent/UnitInMultiUnitComponent';
import { useGetSinglePropertyByUUIDQuery } from '../../store/PropertyPageStore/propertyApiSlice';

const UnitInMultiUnitPage = () => {
	const location = useLocation();

	const currentUUId = location.pathname.split('/')[2]!;

	const {
		data: currentProperty,
		//isLoading: isCurrentPropertyLoading
	} = useGetSinglePropertyByUUIDQuery({
		uuid: currentUUId || '',
	});

	return <UnitInMultiUnitComponent currentProperty={currentProperty} />;
};

export default UnitInMultiUnitPage;
