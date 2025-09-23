import { PermissionType } from "../store/AuthStore/authType";

export const computeCan = (permissions?: PermissionType[]) => {
    const permissionSet = new Set(permissions ?? []);
    return (need: PermissionType | PermissionType[], mode: 'any' | 'all' = 'any') => {
        if (permissionSet.size === 0) {
            return false;
        }
        const list = Array.isArray(need) ? need : [need];
        return mode === 'all'
            ? list.every((p) => permissionSet.has(p))
            : list.some((p) => permissionSet.has(p));
    };
};