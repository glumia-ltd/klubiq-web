
import { DynamicTableColors, DynamicTableStyles } from "@klubiq/ui-components";
import { useTheme } from "@mui/material";


// 3. Create custom hooks for related logic
export const useTenantActions = () => {

    const theme = useTheme();
    const tableSx: DynamicTableColors = {
        headerBg: theme.palette.background.paper,
        headerColor: theme.palette.text.primary,
        rowBg: 'transparent',
        rowHoverBg: theme.palette.action.hover,
        borderColor: 'transparent',
        cellColor: theme.palette.text.secondary,
        tableBorderColor: 'transparent',
        cardBorderColor: 'transparent',
        headerBorderColor: 'transparent',
        cardBgColor: theme.palette.mode === 'dark' ? '#161616' : '#fff',
    };
    const tableStyles: DynamicTableStyles = {
        borderStyle: 'none',
        borderRadius: 0,
        borderWidth: 0,
        paperElevation: 0,
        buttonVariant: 'klubiqMainButton',
        titleVariant: 'h5',
        titleFontWeight: 500,
        headerVariant: 'body1',
        headerFontWeight: 700,
        cellAlign: 'left',
    };


    return {
       
        tableSx,
        tableStyles,
        // ... other handlers
    };
};
