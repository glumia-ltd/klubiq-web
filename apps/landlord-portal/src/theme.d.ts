// src/theme.d.ts
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		dashboardTypography: React.CSSProperties;
		link: React.CSSProperties;
		cardHeader: React.CSSProperties;
		cardContentText: React.CSSProperties;
		cardTitle: React.CSSProperties;
		filterResultText: React.CSSProperties;
		filterResultNumber: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		dashboardTypography?: React.CSSProperties;
		link: React.CSSProperties;
		cardHeader: React.CSSProperties;
		cardContentText: React.CSSProperties;
		cardTitle: React.CSSProperties;
		filterResultText: React.CSSProperties;
		filterResultNumber: React.CSSProperties;
	}

	interface ChipVariants {
		rent: React.CSSProperties;
		sale: React.CSSProperties;
		propertyType: React.CSSProperties;
	}

	interface ChipVariantsOptions {
		rent: React.CSSProperties;
		sale: React.CSSProperties;
		propertyType: React.CSSProperties;
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
		filterResultText: true;
		filterResultNumber: true;
	}
}

declare module '@mui/material/Chip' {
	interface ChipPropsVariantOverrides {
		rent: true;
		sale: true;
		propertyType: React.CSSProperties;
	}
}
