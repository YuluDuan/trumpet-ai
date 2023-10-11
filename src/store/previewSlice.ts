import { Platform } from "@/app/generate-blurb/page";
import { Blurb } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface PreviewModalState {
  isOpen: boolean;
  blurbId: string | null;
  selectedButton: "web" | "mobile";
}

const initialState: PreviewModalState = {
  isOpen: false,
  blurbId: null,
  selectedButton: "web"
};

const previewModalSlice = createSlice({
  name: "previewModal",
  initialState: initialState,
  reducers: {
    onOpenModal: (state, action) => {
      state.isOpen = true;
      state.blurbId = action.payload.blurbId;
      state.selectedButton = "web";
    },
    onCloseModal: (state) => {
      state.isOpen = false;
      state.blurbId = null;
      state.selectedButton = "web";
    },
    onChangeSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
    }
  },
});

export const previewModalActions = previewModalSlice.actions;

export default previewModalSlice.reducer;
