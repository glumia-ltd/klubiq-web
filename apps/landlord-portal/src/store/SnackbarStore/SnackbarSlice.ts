import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
// import { snackbarType } from './snackBarType';
type snackbarType = {
    isOpen: boolean,
    message: string | {}
}


const initialState: snackbarType = {
    isOpen: false,
    message: "" || {}
}

const options = {
    name: 'snack',
    initialState,
    reducers: {
        openSnackbar: (state: snackbarType, action: PayloadAction<snackbarType>) => {
            state.isOpen = true,
                state.message = action.payload.message
        },
        closeSnackbar: (state: snackbarType) => {
            state.isOpen = false
            state.message = ""
        },
    },
};

const snackSlice = createSlice(options);

export const { openSnackbar, closeSnackbar } = snackSlice.actions;

export const getSnackbarControl = (state: RootState) => state.snack;

const snackbarReducer = snackSlice.reducer;

export default snackbarReducer;

