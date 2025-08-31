/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useState } from 'react';

interface ContextValue {
	toggleMobileSidebar: () => void;
	setSidebarOpen: (open: boolean) => boolean;
	isClosing: boolean;
	setIsclosing: (isClosing: boolean) => void;
	sidebarOpen: boolean;
	mobileSideBarOpen: boolean;
	drawerWidth: {
		smallOpen: number;
		smallClosed: number;
		largeOpen: number;
		largeClosed: number;
	};
}

export const Context = createContext<ContextValue>({
	setSidebarOpen: (open: boolean) => open,
	toggleMobileSidebar: () => {},
	setIsclosing: () => {},
	sidebarOpen: true,
	mobileSideBarOpen: false,
	isClosing: false,
	drawerWidth: {
		smallOpen: 170,
		smallClosed: 0,
		largeOpen: 200,
		largeClosed: 55,
	},
});

interface NavToggleProviderProps {
	children: ReactNode;
}

export const NavToggleProvider = ({ children }: NavToggleProviderProps) => {
	const [sidebarOpen, setSidebarState] = useState<boolean>(true);
	const [mobileSideBarOpen, setMobileSidebarState] = useState<boolean>(false);
	const [isClosing, setSideBarIsClosing] = useState<boolean>(false);
	const setSidebarOpen = (open: boolean) => {
		setSidebarState(open);
		return open;
	};
	const setIsclosing = (closing: boolean) => {
		setSideBarIsClosing(closing);
	};
	const toggleMobileSidebar = () => {
		// if (!isClosing) {

		// }
		setMobileSidebarState(!mobileSideBarOpen);
	};
	const drawerWidth = {
		smallOpen: 170,
		smallClosed: 0,
		largeOpen: 200,
		largeClosed: 55,
	};

	const value: ContextValue = {
		sidebarOpen,
		setSidebarOpen,
		mobileSideBarOpen,
		toggleMobileSidebar,
		isClosing,
		setIsclosing,
		drawerWidth,
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
};
