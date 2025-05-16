import { configureStore, combineReducers, Store } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';

import loaderReducer from './GlobalStore/LoaderSlice'
import snackbarReducer from './SnackbarStore/SnackbarSlice'


const rootReducer = combineReducers({
  snack: snackbarReducer,
  loader: loaderReducer
});

export const store: Store = configureStore({
  reducer: {
    loader: rootReducer
  },
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 

export default store;