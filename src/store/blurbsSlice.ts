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
    return res.json().then((x) => x);
  }
}


export async function getMoreVariants(blurbRequestId: string, platformName: PLATFORM, variantCount: number) {
  const res = await fetch(
    new Request(baseUrl("/api/variant-completion"), {
      method: "POST",
      body: JSON.stringify({blurbRequestId, platformName, variantCount}),
    })
  );

  return res.json()
  .then(x => x)
  .catch(err => console.error(err))
}

export const addNewBlurbVariant = createAsyncThunk(
  "blurbVariant/new",
  async (blurbVariant: BlurbVariantNew) => {
    const createdBlurbVariant = await createBlurbVariant(blurbVariant);
    return createdBlurbVariant;
  }
);

export const addMoreBlurbVariants = createAsyncThunk(
  "blurbVariant/more",
  async (data: {blurbRequestId: string, platformName:PLATFORM, variantCount:number}) => {
    const res = await getMoreVariants(data.blurbRequestId, data.platformName, data.variantCount);
    return res.data;
  }
)

const initialState = {
  platforms: {
    [PLATFORM.Instagram]: {isLoading: false},
    [PLATFORM.LinkedIn]: {isLoading: false},
    [PLATFORM.TikTok]: {isLoading: false},
    [PLATFORM.Twitter]: {isLoading: false},
  },
  blurbs: [
    {platformName: PLATFORM.Instagram, id: "instagram_blurb_id", content: '', isLoading: false, isVisible: true},
    {platformName: PLATFORM.LinkedIn, id: "linkedin_blurb_id", content: '', isLoading: false, isVisible: true},
    {platformName: PLATFORM.TikTok, id: "tiktok_blurb_id", content: '', isLoading: false, isVisible: true},
    {platformName: PLATFORM.Twitter, id: "twitter_blurb_id", content: '', isLoading: false, isVisible: true}
  ] as BlurbVariantUI[],
  status: 'idle',
  error: null,
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
      state.blurbs = state.blurbs.map(x => (x.platformName === platformName) ? {...x, isLoading: true, isVisible: true, isVariant: false} : x);
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
      .addCase(addMoreBlurbVariants.pending, (state, action) => {
        const platformName = action.meta.arg.platformName;
        state.platforms[platformName] = {isLoading: true}
      })
      .addCase(addMoreBlurbVariants.fulfilled, (state, action) => {
        const platformName = action.meta.arg.platformName;
        const blurbs = action.payload;
        const blurbUIs = blurbs.map((blurb:BlurbVariantFull) => {
          const blurbFull = blurbVariantFullDTOSchema.parse(blurb);
          return {...blurbFull, isLoading: false, isVisible: true, isVariant: true} as BlurbVariantUI;
        })
        state.platforms[platformName] = {isLoading: false}
        state.status = 'succeeded'
        const filteredBlurbs = state.blurbs.filter((b) => !(b.platformName === platformName && b.isVariant));
        state.blurbs = [...filteredBlurbs, ...blurbUIs];
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

export const selectVariantsByPlatformName = createSelector(
  [selectAllBlurbsByPlatformId],
  (blurbs) => blurbs.filter(x=> x.isVariant)
)

export const blurbsActions = blurbs.actions;
export default blurbs.reducer;