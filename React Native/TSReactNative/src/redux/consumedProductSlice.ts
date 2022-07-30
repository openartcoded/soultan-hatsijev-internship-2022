import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface ConsumedProductsModifiedState {
  modified: boolean;
}

const initialState: ConsumedProductsModifiedState = {
  modified: false,
};

export const consumedProductsModifiedSlice = createSlice({
  name: "consumedProductsModified",
  initialState: initialState,
  reducers: {
    setConsumedProductsModified: (state, action: PayloadAction<boolean>) => {
      return { ...state, modified: action.payload };
    },
  },
});

export const { setConsumedProductsModified } =
  consumedProductsModifiedSlice.actions;

export const selectConsumedProductsModified = (state: RootState) =>
  state.consumedProducts.modified;

export default consumedProductsModifiedSlice.reducer;
