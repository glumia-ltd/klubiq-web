// Create a new file: src/helpers/apiResponseHandler.ts

import { openSnackbar } from '../store/SnackbarStore/SnackbarSlice';
import { invalidateMultipleTags } from '../store/tags-invalidator';
import { useNavigate } from 'react-router-dom';

interface ApiResponseConfig {
    successMessage: string;
    errorMessage: string;
    tagsToInvalidate?: any[];
    successDuration?: number;
    errorDuration?: number;
    onSuccess?: () => void;
    onError?: () => void;
    navigateTo?: string;
}

export const handleApiResponse = async (
    queryFulfilled: Promise<any>,
    dispatch: any,
    config: ApiResponseConfig,
) => {
    const navigate = useNavigate();
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
        if (config.onSuccess) {
            config.onSuccess();
        }
        if (config.navigateTo) {
            navigate(config.navigateTo, { replace: true });
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
        if (config.onError) {
            config.onError();
        }
        throw error;
    }
};