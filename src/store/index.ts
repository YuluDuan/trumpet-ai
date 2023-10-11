import { configureStore } from '@reduxjs/toolkit';
import previewModalReducer from './previewSlice'
import blurbsReducer from './blurbsSlice';
import platformReducer from './platformSlice';
import blurbRequestReducer from './blurbRequestSlice';

export const store = configureStore({
  reducer: {
    preview: previewModalReducer,
    blurbs: blurbsReducer,
    platform: platformReducer,
    blurbRequest: blurbRequestReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;