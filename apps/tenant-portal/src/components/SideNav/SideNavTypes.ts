import { ReactNode } from "react";

export type NavLink = {
	label: string;
	icon: ReactNode;
	route: string;
	index: number;
	subLinks?: NavLink[];
	showSubLinks?: boolean;
	disabled?: boolean;
};

export type User = {
	email: string;
	firstname?: string;
	lastname?: string;
	profilePicUrl?: string | null;
	role?: string;
};

export type KlubiqSideNavProps = {
	navLinks: NavLink[];
	user: User;
	onNavClick: (route: string) => void;
	onSignOut: () => void;
	onSidebarStateChange?: (isOpen: boolean) => void;
	logoUrl?: string;
	customBottomContent?: ReactNode;
};
