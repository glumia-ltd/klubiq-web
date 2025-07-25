import { TableColumn } from '@klubiq/ui-components';
import { PropertyAddressType, PropertyDataType, PropertyMainType, UnitType } from '../../shared/type';

export interface PropertyUnitComponentProps {
	currentProperty: PropertyDataType;
	multiUnitMode?: boolean;
	multiUnitNumber?: string;
	unitId?: string;
}

export interface PropertyActions {
	progress: boolean;
	handleArchiveProperty: () => Promise<void>;
	handleDeleteProperty: () => Promise<void>;
	handleEditProperty: () => void;
	handleAddLease: () => void;
	handleAddTenant: () => void;
	handleAddUnit: () => void;
}
export type SimpleTableColumn = {
	id: string;
	label: string;
};

export interface TenantsTableData {
	tableColumns: TableColumn[];
	rows: Array<{
		id: string;
		tenant: {
			name: string;
			image: string | null;
		};
		phone: string | null;
		email: string;
		isPrimaryTenant: boolean;
		moveInDate: string | null;
		moveOutDate: string | null;
	}>;
}
export interface LeaseTableData {
	tableColumns: TableColumn[];
	rows: Array<{
		id: string | number;
		startDate: string;
		endDate: string;
		rentAmount: string;
		status: string;
		tenants: Array<{
			name: string;
			image: string | null;
		}>;
	}>;
}

  
  export type Area = {
	value: number | string;
	unit: string;
  };
  
  export type UnitWithProperty = UnitType & {
	property: PropertyMainType;
  };
  