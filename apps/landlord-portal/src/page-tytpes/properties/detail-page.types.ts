import { PropertyDataType } from "../../shared/type";

export interface PropertyUnitComponentProps {
    currentProperty: PropertyDataType;
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
export type TableColumn = {
    id: string;
    label: string;
  }