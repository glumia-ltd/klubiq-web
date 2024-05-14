export enum ThemeMode {
	LIGHT = 'light',
	DARK = 'dark',
}

export type ThemeContextType = {
	mode: ThemeMode;
	switchMode: (mode: ThemeMode) => void;
};
