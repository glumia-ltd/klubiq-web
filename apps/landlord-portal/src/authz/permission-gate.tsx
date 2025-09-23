
import { Tooltip, Button } from '@mui/material';
import type { ReactNode } from 'react';
import { PermissionType } from '../store/AuthStore/authType';
import { useCan } from './use-can';

type PermissionGateProps = {
    orgId: string;
    roleName: string;
    any?: PermissionType[];
    all?: PermissionType[];
    fallback?: ReactNode;
    children: ReactNode;
};

export const PermissionGate = ({ orgId, roleName, any, all, fallback, children, }: PermissionGateProps) => {
    const { can } = useCan(orgId, roleName);

    const allowAll = all ? can(all, 'all') : false;
    const allowAny = any ? can(any, 'any') : false;
    const ok = allowAll || allowAny || (!any && !all);

    if (ok) return <>{children}</>;
    return fallback ?? (
        <Tooltip title="You don’t have permission for this action" placement="top">
            <span><Button disabled>Not permitted</Button></span>
        </Tooltip>
    );
};


