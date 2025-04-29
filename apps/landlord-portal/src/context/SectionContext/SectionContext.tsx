import React, { useMemo } from 'react';
import PathList from '../../helpers/PathList';
type SectionProps = {
	children: React.ReactNode;
};

export const SectionContext = React.createContext({
	getPathList: () => PathList,
});

export const SectionProvider = ({ children }: SectionProps) => {
	const getPathList = useMemo(
		() => () => {
			return PathList;
		},
		[],
	);

	const value = {
		PathList,
		getPathList,
	};

	return (
		<SectionContext.Provider value={value}>{children}</SectionContext.Provider>
	);
};
