// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import commentReducer from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentReducer,
  },
});