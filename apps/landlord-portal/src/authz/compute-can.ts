import { PermissionType } from "../store/AuthStore/authType";

export const computeCan = (set?: Set<string>) => (need: PermissionType | PermissionType[], mode: 'any'|'all' = 'any') => {
    if (!set) {
      return false;
    }
    const list = Array.isArray(need) ? need : [need];
    return mode === 'all' ? list.every(p => set.has(p)) : list.some(p => set.has(p));
};