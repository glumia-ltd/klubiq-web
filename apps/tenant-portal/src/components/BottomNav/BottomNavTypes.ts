import { ReactNode } from "react";

export type NavLink = {
	label: string;
	icon: ReactNode;
	route: string;
	index: number;
	subLinks?: NavLink[];
	showSubLinks?: boolean;
	disabled?: boolean;
	settingsDrawerListNavLinks?: NavLink[];
	onClick?: () => void;
};
