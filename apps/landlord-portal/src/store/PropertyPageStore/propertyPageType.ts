import { PropertyDataType } from '../../shared/type';

export type PropertyStateType = {
	allPropertiesData?: PropertyDataType[] | null;
	currentId?: null | number;
	currentProperty?: PropertyDataType | null;
};
