import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
// import { snackbarType } from './snackBarType';
type snackbarType = {
    message: string
    // messageId: number
}


const initialState: snackbarType = {
    message: "",

}

const options = {
    name: 'snack',
    initialState,
    reducers: {
        openSnackbar: (state: snackbarType, action: PayloadAction<snackbarType>) => {
            state.message = action.payload.message
            // state.messageId = Math.random()
        },
        closeSnackbar: (state: snackbarType) => {
            state.message = ""
        },
    },
};

const snackSlice = createSlice(options);

export const { openSnackbar, closeSnackbar } = snackSlice.actions;

export const getSnackbarControl = (state: RootState) => state.snack;

const snackbarReducer = snackSlice.reducer;

export default snackbarReducer;

