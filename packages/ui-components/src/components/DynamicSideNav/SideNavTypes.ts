import { ReactNode } from "react";

export type NavLink = {
	label: string;
	icon: ReactNode;
	route: string;
	index: number;
};

export type User = {
	name: string;
	role: string;
	avatarUrl: string;
};

export type KlubiqSideNavProps = {
	navLinks: NavLink[];
	user: User;
	onNavClick: (route: string) => void;
	onSignOut: () => void;
	logoUrl?: string;
	customBottomContent?: ReactNode;
};
