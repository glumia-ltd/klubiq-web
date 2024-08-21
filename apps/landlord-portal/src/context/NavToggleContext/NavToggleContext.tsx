import { createContext, ReactNode } from 'react';

interface ContextValue {
	toggleSidebar?: () => void;
	openSidebar?: () => void;
	closeSidebar?: () => void;
	sidebarOpen?: boolean;
	drawerWidth: {
		smallOpen: number;
		smallClosed: number;
		largeOpen: number;
		largeClosed: number;
	};
}

export const Context = createContext<ContextValue>({
	drawerWidth: {
		smallOpen: 200,
		smallClosed: 0,
		largeOpen: 230,
		largeClosed: 70,
	},
});

interface NavToggleProviderProps {
	children: ReactNode;
}

export const NavToggleProvider = ({ children }: NavToggleProviderProps) => {
	const drawerWidth = {
		smallOpen: 200,
		smallClosed: 0,
		largeOpen: 230,
		largeClosed: 70,
	};

	const value: ContextValue = {
		drawerWidth,
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
};
