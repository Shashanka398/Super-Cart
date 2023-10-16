import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../baseUrl";

export const fetchItems = createAsyncThunk("api/fetchItems", async () => {
  try {
    const fetchData = await fetch(baseUrl);
    const data = await fetchData.json();
    return data;
  } catch (error) {
    return error;
  }
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    data: [],
    loading: false,
    error: null,
    loaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.loaded = true;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
