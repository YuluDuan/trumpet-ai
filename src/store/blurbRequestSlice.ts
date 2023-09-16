import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BlurbRequest,
  BlurbRequestFull,
} from "@/types";
import { baseUrl } from "@/lib/api";

export async function createBlurbRequest(blurbRequest: BlurbRequest) {
  const res = await fetch(
    new Request(baseUrl("/api/blurb-requests"), {
      method: "POST",
      body: JSON.stringify(blurbRequest),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export const addNewBlurbRequest = createAsyncThunk(
  "blurbRequests/new",
  async (blurbRequest: BlurbRequest) => {
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
      .addCase(addNewBlurbRequest.pending, (state) => {
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
