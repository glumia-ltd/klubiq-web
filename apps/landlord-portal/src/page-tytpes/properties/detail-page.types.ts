import { TableColumn } from '@klubiq/ui-components';
import { PropertyDataType } from '../../shared/type';

export interface PropertyUnitComponentProps {
	currentProperty: PropertyDataType;
	multiUnitMode?: boolean;
	multiUnitNumber?: string;
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
