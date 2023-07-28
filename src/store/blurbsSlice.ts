import { createAsyncThunk, createSlice, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { BlurbRequest, BlurbVariant, blurbVariantSchema, blurbVriantsShema } from "@/types";
import * as _ from 'lodash';

export const addNewBlurbRequest = createAsyncThunk(
  'blurbRequests/addNewBlurbRequest',

  async ({blurbRequest, platformIds}: {blurbRequest: BlurbRequest, platformIds:number[]}) => {
    const response = await fetch("http://localhost:3000/api/blurb-requests" ,{
      method: 'POST',
      body: JSON.stringify({blurbRequest, platformIds})
    });
    // The response includes the complete blurbRequest object, including unique ID
    return await response.json();
  }
)

type Blurb = {
  platformId: number,
  variants: BlurbVariant[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

const initialState: Blurb[] = [];

const blurbs = createSlice({
  name: 'blurbs',
  initialState: initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(addNewBlurbRequest.fulfilled, (state, action) => {
      console.log(action.payload);
      const blurbVariants = blurbVriantsShema.parse(action.payload);
      const blurbs = _.chain(action.payload)
        .groupBy('platformId')
        .map((value, key) => ({ platformId: parseInt(key), variants: value }))
        .value()
      const blurbStates: Blurb[] = blurbs.map(x => ({...x, status: 'succeeded', error: null} as Blurb));
      return blurbStates;
    })
  }
});

export default blurbs.reducer;