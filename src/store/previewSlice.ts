import { Platform } from "@/app/generate-blurb/page";
import { Blurb } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type Data = {
  blurb: Blurb;
  platform: Platform;
  img: string;
  allBlurbs: Blurb[];
}

interface PreviewModalState {
  isOpen: boolean;
  data: Data | null;
  selectedButton: "web" | "mobile";
}

const initialState: PreviewModalState = {
  isOpen: false,
  data: null,
  selectedButton: "web"
};

const previewModalSlice = createSlice({
  name: "previewModal",
  initialState: initialState,
  reducers: {
    onOpenModal: (state, action) => {
      state.isOpen = true;
      state.data = action.payload;
      state.selectedButton = "web";
    },
    onCloseModal: (state) => {
      state.isOpen = false;
      state.data = null;
      state.selectedButton = "web";
    },
    onChangeSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
    }
  },
});

export const previewModalActions = previewModalSlice.actions;

export default previewModalSlice.reducer;
