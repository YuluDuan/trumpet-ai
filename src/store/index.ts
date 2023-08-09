import { configureStore } from '@reduxjs/toolkit';
import previewModalReducer from './previewSlice'
import blurbsReducer from './blurbsSlice';
import platformReducer from './platformSlice';

export const store = configureStore({
  reducer: {
    preview: previewModalReducer,
    blurbs: blurbsReducer,
    platform: platformReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;