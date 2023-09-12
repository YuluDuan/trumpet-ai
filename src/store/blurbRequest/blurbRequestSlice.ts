import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Blurb,
  BlurbRequest,
  BlurbRequestFull,
  blurbRequestFullSchema,
} from "@/types";
import { createSelector } from "reselect";
import { RootState } from "@/store/index";
import { createBlurbRequest } from "./api";
import { stat } from "fs";

export const addNewBlurbRequest = createAsyncThunk(
  "blurbRequests/new",
  async ({ blurbRequest }: { blurbRequest: BlurbRequest }) => {
    const createdBlurbRequest = await createBlurbRequest(blurbRequest);
    return createdBlurbRequest;
  }
);

interface BlurbRequestState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  blurbRequest: BlurbRequestFull | null;
}

const initialState: BlurbRequestState = {
  blurbRequest: null,
  status: "idle",
  error: null,
};

const blurbRequest = createSlice({
  name: "blurbRequest",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewBlurbRequest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewBlurbRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blurbRequest = action.payload;
      });
  },
});

export const blurbRequestActions = blurbRequest.actions;
export default blurbRequest.reducer;
