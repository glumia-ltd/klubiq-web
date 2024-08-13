// src/theme.d.ts
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		dashboardTypography: React.CSSProperties;
		link: React.CSSProperties;
		cardHeader: React.CSSProperties;
		cardContentText: React.CSSProperties;
		cardTitle: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		dashboardTypography?: React.CSSProperties;
		link: React.CSSProperties;
		cardHeader: React.CSSProperties;
		cardContentText: React.CSSProperties;
		cardTitle: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		dashboardTypography: true;
		link: true;
		cardHeader: true;
		cardContentText: true;
		cardTitle: true;
	}
}
