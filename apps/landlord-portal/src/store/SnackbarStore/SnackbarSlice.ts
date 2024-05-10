import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type snackbarType = {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
};

const initialState: snackbarType = {
  message: '',
  severity: 'success',
};

const options = {
  name: 'snack',
  initialState,
  reducers: {
    openSnackbar: (
      state: snackbarType,
      action: PayloadAction<snackbarType>
    ) => {
      //   state.message = action.payload.message;
      // state.messageId = Math.random()

      return {
        ...state,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    },
    closeSnackbar: (state: snackbarType) => {
      return { ...state, message: '' };
    },
  },
};

const snackSlice = createSlice(options);

export const { openSnackbar, closeSnackbar } = snackSlice.actions;

export const getSnackbarControl = (state: RootState) => state.snack;

const snackbarReducer = snackSlice.reducer;

export default snackbarReducer;
