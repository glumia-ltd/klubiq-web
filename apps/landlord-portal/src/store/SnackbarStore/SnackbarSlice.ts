import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type snackbarType = {
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
    isOpen: boolean
};

const initialState: snackbarType = {
    message: '',
    severity: 'success',
    isOpen: true
};

const options = {
    name: 'snack',
    initialState,
    reducers: {
        openSnackbar: (
            state: snackbarType,
            action: PayloadAction<snackbarType>
        ) => {
            return {
                ...state,
                message: action.payload.message,
                severity: action.payload.severity,
                isOpen: true
            };
        },
        closeSnackbar: (state: snackbarType) => {
            return { ...state, message: '', isOpen: false };
        },
    },
};

const snackSlice = createSlice(options);

export const { openSnackbar, closeSnackbar } = snackSlice.actions;

export const getSnackbarControl = (state: RootState) => state.snack;

const snackbarReducer = snackSlice.reducer;

export default snackbarReducer;
