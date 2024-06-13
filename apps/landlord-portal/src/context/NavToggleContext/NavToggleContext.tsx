import { useState, useCallback, createContext, ReactNode } from 'react';

interface ContextValue {
	toggleSidebar: () => void;
	openSidebar: () => void;
	closeSidebar: () => void;
	sidebarOpen: boolean;
}

export const Context = createContext<ContextValue>({
	toggleSidebar: () => {},
	openSidebar: () => {},
	closeSidebar: () => {},
	sidebarOpen: false,
});

interface NavToggleProviderProps {
	children: ReactNode;
}

export const NavToggleProvider = ({ children }: NavToggleProviderProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const closeSidebar = useCallback(() => setSidebarOpen(false), []);

	const openSidebar = useCallback(() => setSidebarOpen(true), []);

	const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

	const value: ContextValue = {
		toggleSidebar,
		openSidebar,
		closeSidebar,
		sidebarOpen,
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
};
