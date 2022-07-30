import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BarcodeState {
  barcode: string;
}

const initialState: BarcodeState = {
  barcode: "3017620422003",
};

export const barcodeSlice = createSlice({
  name: "barcode",
  initialState,
  reducers: {
    setBarcode: (state, action: PayloadAction<string>) => {
      return { ...state, barcode: action.payload };
    },
  },
});

export const { setBarcode } = barcodeSlice.actions;

export const selectBarcode = (state: RootState) => state.barcode.barcode;

export default barcodeSlice.reducer;

