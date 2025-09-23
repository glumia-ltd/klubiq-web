import { PermissionType } from "../store/AuthStore/authType";

export const PERMISSIONS = {
    PROPERTY: {
        CREATE: 'Property:Create' as PermissionType,
        READ: 'Property:Read' as PermissionType,
        UPDATE: 'Property:Update' as PermissionType,
        DELETE: 'Property:Delete' as PermissionType,
    },
    LEASE: {
        CREATE: 'Lease:Create' as PermissionType,
        READ: 'Lease:Read' as PermissionType,
        UPDATE: 'Lease:Update' as PermissionType,
        DELETE: 'Lease:Delete' as PermissionType,
    },
    TENANT: {
        CREATE: 'Tenant:Create' as PermissionType,
        READ: 'Tenant:Read' as PermissionType,
        UPDATE: 'Tenant:Update' as PermissionType,
        DELETE: 'Tenant:Delete' as PermissionType,
    },
    DASHBOARD: {
        READ: 'Dashboard:Read' as PermissionType,
    },
    SETTINGS: {
        READ: 'Setting:Read' as PermissionType,
        UPDATE: 'Setting:Update' as PermissionType,
        DELETE: 'Setting:Delete' as PermissionType,
        CREATE: 'Setting:Create' as PermissionType,
    },
    TEST: {
        READ: 'Test:Read' as PermissionType,
        CREATE: 'Test:Create' as PermissionType,
        UPDATE: 'Test:Update' as PermissionType,
        DELETE: 'Test:Delete' as PermissionType,
    },
} as const;