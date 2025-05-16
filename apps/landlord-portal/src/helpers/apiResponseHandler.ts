// Create a new file: src/helpers/apiResponseHandler.ts

import { openSnackbar } from '../store/SnackbarStore/SnackbarSlice';
import { invalidateMultipleTags } from '../store/tags-invalidator';

interface ApiResponseConfig {
    successMessage: string;
    errorMessage: string;
    tagsToInvalidate?: any[];
    successDuration?: number;
    errorDuration?: number;
}

export const handleApiResponse = async (
    queryFulfilled: Promise<any>,
    dispatch: any,
    config: ApiResponseConfig
) => {
    try {
        const result = await queryFulfilled;
        dispatch(openSnackbar({
            message: config.successMessage,
            severity: 'success',
            isOpen: true,
            duration: config.successDuration || 3000
        }));
        
        if (config.tagsToInvalidate) {
            invalidateMultipleTags(dispatch, config.tagsToInvalidate);
        }
        
        return result;
    } catch (error) {
        console.error('API Error:', (error as any).error);
        const errorMessage = (error as any).error?.message || config.errorMessage;
        dispatch(openSnackbar({
            message: errorMessage,
            severity: 'error',
            isOpen: true,
            duration: config.errorDuration || 7000
        }));
        throw error;
    }
};