import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { barcodeSlice } from "./barcodeSlice";
import { consumedProductsModifiedSlice } from "./consumedProductSlice";
import { userSlice } from "./userSlice";

const rootReducer = combineReducers({});

const Store = configureStore({
  reducer: {
    barcode: barcodeSlice.reducer,
    consumedProducts: consumedProductsModifiedSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;

export default Store;
