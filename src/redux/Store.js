import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices/CartSlice";
import ApiDataSlice from "./Slices/ApiDataSlice";
import FilterSlice from "./Slices/FilterSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    items: ApiDataSlice,
    filter: FilterSlice, // Corrected the key from "filters" to "filter"
  },
});
