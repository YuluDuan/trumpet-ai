import { configureStore } from "@reduxjs/toolkit";
import previewModalReducer from "./previewSlice";
import blurbsReducer from "./blurb/blurbsSlice";
import blurbRequestReducer from "./blurbRequest/blurbRequestSlice";
import platformReducer from "./platform/platformSlice";

export const store = configureStore({
  reducer: {
    preview: previewModalReducer,
    blurbs: blurbsReducer,
    blurbRequest: blurbRequestReducer,
    platform: platformReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
