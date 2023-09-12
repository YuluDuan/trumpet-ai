import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlurbRequest, Blurb, blurbsSchema } from "@/types";
import { createSelector } from "reselect";
import { RootState } from "@/store/index";
import { generateBlurbs } from "./api";

const initialState = {
  blurbs: [] as Blurb[],
  status: "idle",
  error: null,
};

const blurbs = createSlice({
  name: "blurbs",
  initialState: initialState,
  reducers: {
    updateBlurbContentById: (state, action) => {
      const oldBlurb = state.blurbs.find(
        (blurb) => blurb.id === action.payload.id
      );
      if (oldBlurb) {
        oldBlurb.content = action.payload.content;
      }
    },

    deleteBlurbById: (state, action) => {
      state.blurbs = state.blurbs.filter(
        (blurb) => blurb.id !== action.payload.id
      );
    },
  },
});

export const selectAllBlurbs = (state: RootState) => state.blurbs.blurbs;

export const selectBlurbById = createSelector(
  [selectAllBlurbs, (state, blurbId) => blurbId],
  (blurbs, blurbId) => blurbs.find((blurb) => blurb.id === blurbId)
);
export const selectAllBlurbsByPlatformId = createSelector(
  [selectAllBlurbs, (state, platformId) => platformId],
  (blurbs, platformId) =>
    blurbs.filter((blurb) => blurb.platformName === platformId)
);
export const selectFirstBlurbByPlatformId = createSelector(
  [selectAllBlurbsByPlatformId],
  (blurbs) => blurbs[0]
);
export const selectNBlurbsByPlatformId = createSelector(
  [selectAllBlurbsByPlatformId, (state, platformId, n) => n],
  (blurbs, n) => blurbs.slice(1, 1 + n)
);

export const selectFirstBlurbByPlatformNames = (
  state: RootState,
  platformNames: string[]
) => {
  return platformNames.map((platformName) =>
    state.blurbs.blurbs.find((blurb) => blurb.platformName === platformName)
  );
};
export const blurbsActions = blurbs.actions;
export default blurbs.reducer;
