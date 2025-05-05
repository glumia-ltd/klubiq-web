import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { consoleError } from "../../helpers/debug-logger";
import { PropertyDataType } from "../../shared/type";
import { useArchivePropertyMutation, useDeletePropertyMutation } from "../../store/PropertyPageStore/propertyApiSlice";
import { openSnackbar } from "../../store/SnackbarStore/SnackbarSlice";
import { DynamicTableColors, DynamicTableStyles } from "@klubiq/ui-components";
import { useTheme } from "@mui/material";

  
  // 3. Create custom hooks for related logic
  export const usePropertyActions = (currentUUId?: string, 
	currentProperty?: PropertyDataType, propertyAddress?: string,  setOpenDeletePropertyDialog?: (open: boolean) => void, setOpenArchivePropertyDialog?: (open: boolean) => void, setOpen?: (open: boolean) => void) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [archiveProperty] = useArchivePropertyMutation();
    const [deleteProperty] = useDeletePropertyMutation();
    const [progress, setProgress] = useState(false);
  
    const handleArchivePropertyRequest = async () => {
        if (currentUUId && setOpenArchivePropertyDialog && setOpen) {
        			try {
        				setProgress(true);
        				await archiveProperty({ uuid: currentUUId }).unwrap();
        				setOpenArchivePropertyDialog(false);
        				setOpen(false);
        				dispatch(
        					openSnackbar({
        						message: 'You have successfully archived this property!',
        						severity: 'success',
        						isOpen: true,
        					}),
        				);
        				navigate('/properties');
        			} catch (e) {
        				consoleError(e);
        			} finally {
        				setProgress(false);
        			}
        		}
        else if (setOpenArchivePropertyDialog) {
        				setOpenArchivePropertyDialog(false);
        			}
    };

    const handleDeletePropertyRequest = async () => {
        if (currentUUId && setOpenDeletePropertyDialog && setOpen && propertyAddress && currentProperty?.name && currentProperty?.unitCount) {
        			try {
        				setProgress(true);
        				await deleteProperty({
        					uuid: currentUUId,
        					address: propertyAddress,
        					name: currentProperty?.name,
        					unitCount: currentProperty?.unitCount,
        				}).unwrap();
        				setOpenDeletePropertyDialog(false);
        				setOpen(false);
        				
        				dispatch(
        					openSnackbar({
        						message: 'You have successfully deleted this property!',
        						severity: 'success',
        						isOpen: true,
        					}),
        				);
        				navigate('/properties');
        			} catch (e) {
        				consoleError(e);
        				setOpenDeletePropertyDialog(false);
        				dispatch(
        					openSnackbar({
        						message: 'Error deleting this property',
        						severity: 'error',
        						isOpen: true,
        					}),
        				);
        			} finally {
        				setProgress(false);
        			}
                    
        		}
        else if (setOpenDeletePropertyDialog) {
        				setOpenDeletePropertyDialog(false);
        			}
      
      
    }
  
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
		buttonVariant: 'text',
		titleVariant: 'h4',
		titleFontWeight: 700,
		headerVariant: 'body1',
		headerFontWeight: 400,
		cellAlign: 'left',
	};

  
    return {
      progress,
      handleArchivePropertyRequest,
      handleDeletePropertyRequest,
      tableSx,
      tableStyles,
      // ... other handlers
    };
  };
