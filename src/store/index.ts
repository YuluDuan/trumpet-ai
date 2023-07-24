import { configureStore } from '@reduxjs/toolkit';
import previewModalReducer from './preview-slice'

export const store = configureStore({
  reducer: {
    preview: previewModalReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;