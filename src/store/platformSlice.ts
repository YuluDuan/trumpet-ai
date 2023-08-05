import { createSlice, createAsyncThunk, createEntityAdapter, EntityState, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Platform } from "@prisma/client";
import { BlurbRequest } from "@/types";
import { RootState } from "@/store/index";

// Define the state with EntityState
interface PlatformState extends EntityState<Platform> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedIds: number[];
}
export const getPlatforms = createAsyncThunk(
  'platforms/get',
  async () => {
    const response = await fetch("http://localhost:3000/api/platforms");
    return await response.json();
  }
)

// Create the entity adapter
const platformAdapter = createEntityAdapter<Platform>({
  selectId: (platform) => platform.id,
  // Optionally specify sorting rules
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Define the initial state using the adapter
const initialState: PlatformState = platformAdapter.getInitialState({
  status: "idle",
  error: null,
  selectedIds: []
});

// Create the platform slice
const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    selectPlatforms: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlatforms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPlatforms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Use the adapter's `upsertMany` to handle the fetched data
        platformAdapter.upsertMany(state, action.payload);
      })
      .addCase(getPlatforms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default platformSlice.reducer;
export const platformSliceActions = platformSlice.actions;

// Export the entity adapter selectors
export const {
  selectAll: selectAllPlatforms,
  selectById: selectPlatformById,
  selectIds: selectPlatformIds,
} = platformAdapter.getSelectors((state: RootState) => state.platform);

export const selectSelectedPlatformIds = (state: RootState) => state.platform.selectedIds;

export const selectSelectedPlatforms = createSelector(
  (state: RootState) => state.platform.selectedIds,
  (state: RootState) => state.platform.entities,
  (selectedIds, entities) => selectedIds.map(id => entities[id]).filter(Boolean)
);

