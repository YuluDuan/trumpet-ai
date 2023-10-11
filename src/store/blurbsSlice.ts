import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlurbVariantFull, blurbVariantFullDTOSchema, BlurbVariantNew, BlurbVariantUI, PLATFORM } from "@/types";
import { createSelector } from "reselect";
import { RootState } from "@/store/index";
import { baseUrl } from "@/lib/api";

export async function createBlurbVariant(blurbVariant: BlurbVariantNew) {
  const res = await fetch(
    new Request(baseUrl("/api/blurb-variants"), {
      method: "POST",
      body: JSON.stringify(blurbVariant),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export const addNewBlurbVariant = createAsyncThunk(
  "blurbVariant/new",
  async (blurbVariant: BlurbVariantNew) => {
    const createdBlurbVariant = await createBlurbVariant(blurbVariant);
    return createdBlurbVariant;
  }
);

const initialState = {
  blurbs: [
    {platformName: PLATFORM.Instagram, id: "instagram_blurb_id", content: '', isLoading: false, isVisible: true},
    {platformName: PLATFORM.LinkedIn, id: "linkedin_blurb_id", content: '', isLoading: false, isVisible: true},
    {platformName: PLATFORM.TikTok, id: "tiktok_blurb_id", content: '', isLoading: false, isVisible: true},
    {platformName: PLATFORM.Twitter, id: "twitter_blurb_id", content: '', isLoading: false, isVisible: true}
  ] as BlurbVariantUI[],
  status: 'idle',
  error: null
}

const blurbs = createSlice({
  name: 'blurbs',
  initialState: initialState,
  reducers: {
    updateBlurbContentById:(state, action) => {
      const oldBlurb = state.blurbs.find(blurb => blurb.id === action.payload.id);
      if (oldBlurb) {
        oldBlurb.content = action.payload.content;
      }
    },
    deleteBlurbById:(state, action) => {
        state.blurbs = state.blurbs.map(x => (x.id === action.payload.id) ? {...x, isVisible: false} : x);
    },
    generateMainBlurb:(state, action) => {
      const platformName = action.payload;
      state.blurbs = state.blurbs.map(x => (x.platformName === platformName) ? {...x, isLoading: true, isVisible: true} : x);
      state.status = 'loading';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addNewBlurbVariant.pending, (state, action) => {
        const platformName = action.meta.arg.platformName;
        state.blurbs = state.blurbs.map(x => (x.platformName === platformName) ? {...x, isLoading: true} : x)
        state.status = 'loading';
      })
      .addCase(addNewBlurbVariant.fulfilled, (state, action) => {
        const blurbFull = blurbVariantFullDTOSchema.parse(action.payload);
        const blurbUI = {...blurbFull, isLoading: false, isVisible: true} as BlurbVariantUI
        state.status = 'succeeded'
        state.blurbs = state.blurbs.filter((b) => blurbUI.platformName !== b.platformName);
        state.blurbs = [...state.blurbs, blurbUI];
      })
  }
});

export const selectAllBlurbs = (state: RootState) => state.blurbs.blurbs;

export const selectAllVisibleMainBlurbs = createSelector(
  [selectAllBlurbs],
  (allblurbs) => allblurbs.filter(blurb => blurb.isVisible)
)

export const selectBlurbById = createSelector(
  [selectAllBlurbs, (state, blurbId) => blurbId],
  (blurbs, blurbId) => blurbs.find(blurb => blurb.id === blurbId)
)

export const selectAllBlurbsByPlatformId = createSelector(
  [selectAllBlurbs, (state, platformName) => platformName],
  (blurbs, platformName) => blurbs.filter(blurb => blurb.platformName === platformName)
)
export const selectFirstBlurbByPlatformId = createSelector(
  [selectAllBlurbsByPlatformId],
  (blurbs) => blurbs[0]
  )

export const selectNBlurbsByPlatformId = createSelector(
  [selectAllBlurbsByPlatformId, (state, platformId, n) => n],
  (blurbs, n) => blurbs.slice(1, 1+n)
)

export const selectFirstBlurbByPlatformIds = (state: RootState, platformNames: PLATFORM[]) => {
  return platformNames.map((platformName) => state.blurbs.blurbs.find((blurb) => blurb.platformName === platformName));
}
export const blurbsActions = blurbs.actions;
export default blurbs.reducer;