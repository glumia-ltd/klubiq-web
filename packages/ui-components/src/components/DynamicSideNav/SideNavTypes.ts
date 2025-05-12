export type NavLink = {
	label: string;
	icon: React.ReactNode;
	route: string;
	active?: boolean;
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
	customBottomContent?: React.ReactNode;
};
