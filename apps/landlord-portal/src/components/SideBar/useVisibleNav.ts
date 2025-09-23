// src/navigation/useVisibleNav.ts
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useCan } from '../../authz/use-can';
import { NavItem } from '../../helpers/PathList';

const canSee = (item: NavItem, can: (n: any, m?: any) => boolean) => {
	const any =
		item.permsAny && item.permsAny.length ? can(item.permsAny, 'any') : true;
	const all =
		item.permsAll && item.permsAll.length ? can(item.permsAll, 'all') : true;
	return any && all;
};

const filterTree = (
	items: NavItem[],
	can: (n: any, m?: any) => boolean,
): NavItem[] => {
	return items
		.map((i) => ({
			...i,
			children: i.children ? filterTree(i.children, can) : undefined,
		}))
		.filter((i) => canSee(i, can) || (i.children && i.children.length));
};

export const useVisibleNav = (nav: NavItem[]) => {
	const { user } = useSelector(getAuthState);
	const { organizationUuid, role } = user;
	const { can, loading } = useCan(organizationUuid, role);
	const visible = loading ? [] : filterTree(nav, can);
	return { visible, can, loading };
};
