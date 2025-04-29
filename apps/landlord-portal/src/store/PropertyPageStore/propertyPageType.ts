import { PropertyDataType } from '../../shared/type';

export type PropertyStateType = {
	allPropertiesData?: PropertyDataType[] | null;
	currentId?: null | number | string;
	currentProperty?: PropertyDataType | null;
	currentFilter?: any;
};
