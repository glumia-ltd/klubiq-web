import { useState, useCallback, createContext, ReactNode } from 'react';

interface ContextValue {
	toggleSidebar: () => void;
	openSidebar: () => void;
	closeSidebar: () => void;
	sidebarOpen: boolean;
	drawerWidth: {
		smallOpen: number;
		smallClosed: number;
		largeOpen: number;
		largeClosed: number;
	};
}

export const Context = createContext<ContextValue>({
	toggleSidebar: () => {},
	openSidebar: () => {},
	closeSidebar: () => {},
	sidebarOpen: false,
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
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const closeSidebar = useCallback(() => setSidebarOpen(false), []);

	const openSidebar = useCallback(() => setSidebarOpen(true), []);

	const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
	const drawerWidth = {
		smallOpen: 200,
		smallClosed: 0,
		largeOpen: 230,
		largeClosed: 70,
	};

	const value: ContextValue = {
		toggleSidebar,
		openSidebar,
		closeSidebar,
		sidebarOpen,
		drawerWidth,
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
};
