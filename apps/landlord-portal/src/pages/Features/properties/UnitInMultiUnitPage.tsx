import { useLocation, useNavigate } from 'react-router-dom';
import { useGetSinglePropertyByUUIDQuery } from '../../../store/PropertyPageStore/propertyApiSlice';
import { UnitSkeleton } from '../../../components/skeletons/UnitSkeleton';
import { PropertyUnitComponent } from '../../../components/PropertyUnitComponent/PropertyUnitComponent';

type MultiUnitPropertyState = {
	mode: string;
	unitUuid: string;
	returnPath: string;
	multiUnitNumber: string;
};
const UnitInMultiUnitPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { unitUuid, returnPath, multiUnitNumber } =
		location.state as MultiUnitPropertyState;
	const currentUUId = location.pathname.split('/')[2]!;
	if (!currentUUId || !unitUuid) {
		navigate(returnPath);
	}

	const { data: propertyWithSingleUnit, isLoading: isCurrentPropertyLoading } =
		useGetSinglePropertyByUUIDQuery(
			{ uuid: currentUUId },
			{
				selectFromResult: ({ data, ...other }) => ({
					...other,
					data: data
						? {
								...data,
								units:
									data.units?.filter((unit: any) => unit.id === unitUuid) ?? [],
							}
						: undefined,
				}),
			},
		);

	return isCurrentPropertyLoading ? (
		<UnitSkeleton currentProperty={propertyWithSingleUnit} />
	) : (
			<PropertyUnitComponent currentProperty={propertyWithSingleUnit} multiUnitMode={true} multiUnitNumber={multiUnitNumber || '' } />
		);
};

export default UnitInMultiUnitPage;
