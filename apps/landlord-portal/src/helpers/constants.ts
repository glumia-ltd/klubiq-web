import { SimpleTableColumn } from "../page-tytpes/properties/detail-page.types";
export const ALL_TABS = ['Overview', 'Lease', 'Document'];
export const PROPERTY_CONSTANTS = {
    tabs: ALL_TABS,
    leaseTableColumns: [
      { id: '1', label: 'Tenant' },
      { id: '2', label: 'Status' },
      { id: '3', label: 'Rent Amount' },
      { id: '4', label: 'Start Date' },
      { id: '5', label: 'End Date' },
    ] as SimpleTableColumn[]
  } as const;

  export const PERSON_TITLES = ['Mr', 'Mrs', 'Ms', 'Dr', 'Chief'] as const;
