
import { DynamicTableColors, DynamicTableStyles } from "@klubiq/ui-components";
import { useTheme } from "@mui/material";
import { DateStyle } from "../../helpers/utils";

  
  // 3. Create custom hooks for related logic
  export const useLeaseActions = ( ) => {
  
  
    const theme = useTheme();
    const timeDateOptions = {
		dateStyle: DateStyle.MEDIUM,
		hour12: true,
	};
	const tableSx: DynamicTableColors = {
		headerBg: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.background.paper,
		headerColor: theme.palette.text.primary,
		rowBg: 'transparent',
		rowHoverBg: theme.palette.action.hover,
		borderColor:  'transparent',
		cellColor: theme.palette.text.secondary,
		tableBorderColor: theme.palette.divider,
		cardBorderColor: theme.palette.mode === 'dark' ? theme.palette.divider : '',
		headerBorderColor: theme.palette.divider,
		cardBgColor: theme.palette.mode === 'dark' ? '#161616' : '#fff',
	};
	const tableStyles: DynamicTableStyles = {
		borderStyle: 'none',
		borderRadius: 2,
		borderWidth: 2,
		paperElevation: 0,
		buttonVariant: 'klubiqTextButton',
		titleVariant: 'h4',
		titleFontWeight: 600,
		headerVariant: 'body1',
		headerFontWeight: 500,
		cellAlign: 'left',
	};

  
    return {
      tableSx,
      tableStyles,
      timeDateOptions,
    };
  };
