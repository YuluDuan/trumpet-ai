import { Platform } from "@/app/generate-blurb/page";
import { createSlice } from "@reduxjs/toolkit";

type Data = {
  textContent: string;
  platform: Platform;
  img: string;
}

interface PreviewModalState {
  isOpen: boolean;
  data: Data | null;
}

const initialState: PreviewModalState = {
  isOpen: false,
  data: null,
};

const previewModalSlice = createSlice({
  name: "previewModal",
  initialState: initialState,
  reducers: {
    onOpenModal: (state, action) => {
      state.isOpen = true;
      state.data = action.payload;
    },
    onCloseModal: (state) => {
      state.isOpen = false;
      state.data = null;
    },
  },
});

export const previewModalActions = previewModalSlice.actions;

export default previewModalSlice.reducer;
