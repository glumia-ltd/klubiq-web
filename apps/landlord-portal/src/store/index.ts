import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthStore/AuthSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
